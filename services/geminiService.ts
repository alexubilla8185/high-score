
import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuestionType, Vibe } from "../types";

let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns a singleton instance of the GoogleGenAI client.
 * This is done lazily to prevent the app from crashing on load if the API key isn't set.
 * Throws an error if the API key is not available in the environment.
 */
const getAiClient = (): GoogleGenAI => {
  if (ai) {
    return ai;
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    // This error will now be thrown when the user starts the game,
    // and will be caught by the UI, preventing a blank screen.
    throw new Error("API_KEY environment variable not set. Please configure it in your deployment environment (e.g., Netlify).");
  }

  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
};


const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      type: {
        type: Type.STRING,
        enum: [QuestionType.MultipleChoice, QuestionType.ShortAnswer, QuestionType.ImageQuestion],
        description: "The type of question.",
      },
      question: {
        type: Type.STRING,
        description: "The question text. For IMAGE_QUESTION, this is the question asked about the generated image.",
      },
      options: {
        type: Type.ARRAY,
        description: "An array of 4 possible answers for multiple choice questions. Omit for short answer.",
        items: {
          type: Type.STRING,
        },
      },
      answer: {
        type: Type.STRING,
        description: "The correct answer to the question. For multiple choice, this must exactly match one of the options.",
      },
      explanation: {
        type: Type.STRING,
        description: "A short, witty, and funny explanation for why the answer is correct or what the right answer means.",
      },
      imagePrompt: {
        type: Type.STRING,
        description: "A detailed, surreal, and funny prompt for an image generator. Only include this for IMAGE_QUESTION types.",
      },
    },
    required: ["type", "question", "answer", "explanation"],
  },
};

export const fetchQuizQuestions = async (vibe: Vibe): Promise<Question[]> => {
  console.log(`Fetching quiz questions for vibe: ${vibe}`);

  let vibeInstruction = "";
  switch (vibe) {
    case Vibe.Buzzed:
      vibeInstruction = "The user has chosen the 'Feeling Buzzed' level. The questions should be lighthearted, silly, and focus on simple, funny observations. They should be relatively easy but surprising. Think about goofy shower thoughts.";
      break;
    case Vibe.Toasted:
      vibeInstruction = "The user has chosen the 'Perfectly Toasted' level. This is the classic experience. Generate a balanced mix of creative riddles, bizarre multiple-choice questions, and surreal image-based questions. The tone should be playful, surreal, and humorous.";
      break;
    case Vibe.Voyager:
      vibeInstruction = "The user has chosen the 'Cosmic Voyager' level. The questions should be deeply philosophical, surreal, and abstract, including reality-bending image prompts. Make them very challenging and weird, designed to make users question reality.";
      break;
  }

  const prompt = `
    Generate a list of 10 funny, strange, and challenging quiz questions to determine a person's level of 'highness'. 
    Ensure the questions are highly creative and varied to avoid repetition on subsequent requests.
    
    The questions should be a mix of:
    1. Creative riddles (as SHORT_ANSWER).
    2. Bizarre multiple-choice questions (as MULTIPLE_CHOICE).
    3. Questions about a surreal image (as IMAGE_QUESTION). For variety, make 1 to 3 of the 10 questions an IMAGE_QUESTION.

    ${vibeInstruction}

    For SHORT_ANSWER questions, the answer should be a single word or a very short phrase.
    For MULTIPLE_CHOICE questions, provide exactly 4 options, where one is correct and the others are funny, plausible-but-wrong decoys.
    For IMAGE_QUESTION questions, provide an 'imagePrompt' for an image generation AI. The prompt should be descriptive, surreal, and funny (e.g., "A photorealistic rubber chicken wearing a tiny cowboy hat, riding a snail through a neon-lit puddle."). The 'question' should be about the image (e.g., "What is the chicken riding?"), and the 'answer' should be the correct response (e.g., "A snail").
    
    Every question must have a witty explanation.
    Return the questions in the specified JSON schema format.
  `;

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.0,
      },
    });

    const jsonText = response.text.trim();
    let parsedQuestions: Question[] = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      throw new Error("API returned an empty or invalid list of questions.");
    }
    
    const processedQuestions = parsedQuestions.map(async (q) => {
      if (q.type === QuestionType.ImageQuestion && q.imagePrompt) {
        let imageGenerated = false;
        // Retry logic: Attempt image generation up to 2 times
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`Generating image for prompt: "${q.imagePrompt}" (Attempt ${attempt})`);
            const imageResponse = await getAiClient().models.generateImages({
              model: 'imagen-4.0-generate-001',
              prompt: q.imagePrompt,
              config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '1:1' },
            });

            if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
              const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
              q.imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
              imageGenerated = true;
              break; // Success, exit retry loop
            } else {
              throw new Error("Image generation succeeded but returned no images.");
            }
          } catch (imageError) {
            console.error(`Attempt ${attempt} failed for image prompt: "${q.imagePrompt}"`, imageError);
            if (attempt === 2) { // If last attempt failed
              console.warn("All image generation attempts failed. Falling back to text question.");
            }
          }
        }
        
        if (!imageGenerated) {
          // Fallback: Convert to a ShortAnswer question if all attempts failed
          q.type = QuestionType.ShortAnswer;
          q.question = `Imagine the following scene: "${q.imagePrompt}". Now, answer this: ${q.question}`;
          q.imageUrl = undefined;
        }
      }
      return q;
    });

    let finalQuestions = await Promise.all(processedQuestions);

    finalQuestions = finalQuestions.filter(q => {
        if (q.type === QuestionType.MultipleChoice && (!q.options || q.options.length < 2)) {
            console.warn(`Filtering out malformed multiple choice question: "${q.question}"`);
            return false;
        }
        return true;
    });

    if(finalQuestions.length === 0) {
        throw new Error("All generated questions were invalid after processing.");
    }

    for (let i = finalQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [finalQuestions[i], finalQuestions[j]] = [finalQuestions[j], finalQuestions[i]];
    }

    return finalQuestions;
  } catch (error) {
    console.error("Error fetching or parsing questions:", error);
    if (error instanceof Error) {
        throw error; // Re-throw the original error to be handled by the context
    }
    throw new Error("A mysterious cosmic anomaly occurred while fetching questions. Please try again.");
  }
};

export const fetchFunnyFeedback = async (question: string, userAnswer: string): Promise<string> => {
    console.log(`Fetching funny feedback for question: "${question}" with answer: "${userAnswer}"`);
    const prompt = `
        You are a witty, slightly unhinged quizmaster.
        A user was asked the following question: "${question}"
        They answered: "${userAnswer}"
        Your task is to provide a short, funny, and clever reaction to their answer. It could be a compliment if it's clever, a funny put-down if it's absurd, or a moment of shared confusion. Keep it to a single sentence. Do NOT return your response in quotes. Be direct.
    `;

    try {
        const response = await getAiClient().models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { temperature: 0.9, },
        });
        const feedbackText = response.text.trim();
        if (!feedbackText) throw new Error("API returned empty feedback.");
        return feedbackText;
    } catch (error) {
        console.error("Error fetching funny feedback:", error);
        if (error instanceof Error) {
            throw error; // Re-throw to be handled by the caller
        }
        throw new Error("Failed to get witty remark from Gemini API.");
    }
};
