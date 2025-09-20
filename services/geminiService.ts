
import { Question, Vibe, AIPersonality } from "../types";

const PROXY_ENDPOINT = '/.netlify/functions/gemini-proxy';

const handleFetchErrors = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
            error: 'A mysterious cosmic anomaly occurred on the server.' 
        }));
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }
    return response.json();
};

export const fetchQuizQuestions = async (vibe: Vibe, aiPersonality: AIPersonality): Promise<Question[]> => {
  const response = await fetch(PROXY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getQuestions', vibe, aiPersonality }),
  });

  const questions: Question[] = await handleFetchErrors(response);
  return questions;
};

export const fetchFunnyFeedback = async (question: string, userAnswer: string, aiPersonality: AIPersonality): Promise<string> => {
    const response = await fetch(PROXY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getFeedback', question, userAnswer, aiPersonality }),
    });

    const { feedback } = await handleFetchErrors(response);
    if (!feedback) {
        throw new Error("Proxy returned empty feedback.");
    }
    return feedback;
};