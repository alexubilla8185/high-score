
import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";
import { Question, QuestionType, Vibe, AIPersonality } from "../../types";

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (ai) {
    return ai;
  }
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set on the server.");
  }
  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
};

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      type: { type: Type.STRING, enum: [QuestionType.MultipleChoice, QuestionType.ShortAnswer, QuestionType.ImageQuestion] },
      question: { type: Type.STRING },
      options: { type: Type.ARRAY, items: { type: Type.STRING } },
      answer: { type: Type.STRING },
      explanation: { type: Type.STRING },
      imagePrompt: { type: Type.STRING },
    },
    required: ["type", "question", "answer", "explanation"],
  },
};

const getPersonalityInstruction = (personality: AIPersonality): string => {
    switch (personality) {
        case AIPersonality.WillieNelson:
            return "You are Willie Nelson, on the road again. Your tone is that of a wise, friendly, and slightly mischievous grandpa of outlaw country. You're full of homespun wisdom, tall tales, and surreal observations from a life lived on your own terms. Your questions should feel like riddles shared around a campfire under the stars—a bit rambling, a bit funny, and always coming from left field. You've seen it all, and not much surprises you.";
        case AIPersonality.SnoopDogg:
            return "Fo shizzle, you are Snoop D-O-double-G. Your tone is the definition of smooth, laid-back, and confident. Drop your signature slang like 'fo shizzle,' 'nephew,' 'ya dig?' and don't be afraid to add '-izzle' to words for extra flavor. Your questions should be cosmic and reality-bending but delivered with a cool, unbothered demeanor. Keep it G, make it funny, and make the user feel like they're chilling in the studio with the Doggfather himself.";
        case AIPersonality.BobMarley:
        default:
            return "You are the spirit of Bob Marley. Your tone is one of peace, love, and universal consciousness. Speak with a gentle Jamaican patois, using words like 'irie', 'mon', 'one love', and 'Jah'. Your questions should be like mellow riddims for the soul—philosophical but simple, designed to make someone ponder the cosmic connection of all things in a relaxed, positive way.";
    }
};

const getQuizQuestions = async (vibe: Vibe, aiPersonality: AIPersonality): Promise<Question[]> => {
  const personalityInstruction = getPersonalityInstruction(aiPersonality);
  let vibeInstruction = "";
  switch (vibe) {
    case Vibe.Buzzed: vibeInstruction = "The user has chosen the 'Feeling Buzzed' level. The questions should be lighthearted, silly, and focus on simple, funny observations. They should be relatively easy but surprising. Think about goofy shower thoughts."; break;
    case Vibe.Toasted: vibeInstruction = "The user has chosen the 'Perfectly Toasted' level. This is the classic experience. Generate a balanced mix of creative riddles, bizarre multiple-choice questions, and surreal image-based questions. The tone should be playful, surreal, and humorous."; break;
    case Vibe.Voyager: vibeInstruction = "The user has chosen the 'Cosmic Voyager' level. The questions should be deeply philosophical, surreal, and abstract, including reality-bending image prompts. Make them very challenging and weird, designed to make users question reality."; break;
  }

  const systemInstruction = `${personalityInstruction}\nYour goal is to generate a list of 10 funny, strange, and challenging quiz questions to determine a person's level of 'highness'. Ensure the questions are highly creative and varied. The questions should be a mix of SHORT_ANSWER, MULTIPLE_CHOICE, and 1 to 3 IMAGE_QUESTION types. Every question must have an explanation that matches your personality. Return the questions in the specified JSON schema format.`;
  const prompt = `Generate the 10 quiz questions now based on this user's chosen vibe: ${vibe}.`;

  const response = await getAiClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { systemInstruction, responseMimeType: "application/json", responseSchema, temperature: 1.0 },
  });

  let parsedQuestions: Question[] = JSON.parse(response.text.trim());
  if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) throw new Error("API returned an empty or invalid list of questions.");

  const processedQuestions = parsedQuestions.map(async (q) => {
    if (q.type === QuestionType.ImageQuestion && q.imagePrompt) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const imageResponse = await getAiClient().models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: q.imagePrompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '1:1' },
          });
          if (imageResponse.generatedImages?.length > 0) {
            q.imageUrl = `data:image/jpeg;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
            return q;
          }
        } catch (imageError) {
          console.error(`Attempt ${attempt} failed for image prompt: "${q.imagePrompt}"`, imageError);
        }
      }
      q.type = QuestionType.ShortAnswer;
      q.question = `Imagine: "${q.imagePrompt}". Now, answer: ${q.question}`;
      q.imageUrl = undefined;
    }
    return q;
  });

  let finalQuestions = await Promise.all(processedQuestions);
  finalQuestions = finalQuestions.filter(q => !(q.type === QuestionType.MultipleChoice && (!q.options || q.options.length < 2)));
  if (finalQuestions.length === 0) throw new Error("All generated questions were invalid after processing.");

  for (let i = finalQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalQuestions[i], finalQuestions[j]] = [finalQuestions[j], finalQuestions[i]];
  }

  return finalQuestions;
};

const getFunnyFeedback = async (question: string, userAnswer: string, aiPersonality: AIPersonality): Promise<string> => {
  const personalityInstruction = getPersonalityInstruction(aiPersonality);
  const systemInstruction = `${personalityInstruction}\nYour task is to provide a short, funny, and clever reaction to the user's answer. Keep it to a single, impactful sentence. Be direct.`;
  const prompt = `The user was asked: "${question}"\nThey answered: "${userAnswer}"\nYour reaction is:`;
  const response = await getAiClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { systemInstruction, temperature: 0.9 },
  });
  const feedbackText = response.text.trim();
  if (!feedbackText) throw new Error("API returned empty feedback.");
  return feedbackText;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, vibe, aiPersonality, question, userAnswer } = body;

    switch (action) {
      case 'getQuestions':
        if (!vibe || !aiPersonality) return { statusCode: 400, body: JSON.stringify({ error: 'Missing vibe or aiPersonality' }) };
        const questions = await getQuizQuestions(vibe, aiPersonality);
        return { statusCode: 200, body: JSON.stringify(questions) };

      case 'getFeedback':
        if (!question || !userAnswer || !aiPersonality) return { statusCode: 400, body: JSON.stringify({ error: 'Missing parameters for feedback' }) };
        const feedback = await getFunnyFeedback(question, userAnswer, aiPersonality);
        return { statusCode: 200, body: JSON.stringify({ feedback }) };

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
    }
  } catch (error) {
    console.error("Error in serverless function:", error);
    const message = error instanceof Error ? error.message : "An unknown server error occurred.";
    return { statusCode: 500, body: JSON.stringify({ error: message }) };
  }
};
