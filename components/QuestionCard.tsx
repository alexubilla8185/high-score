
import React, { useState, useEffect, FormEvent } from 'react';
import { QuestionType } from '../types';
import { useGame } from '../context/GameContext';

const QuestionCard: React.FC = () => {
  const { state, dispatch } = useGame();
  const { questions, currentQuestionIndex, userAnswers } = state;
  const question = questions[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const isAnswered = userAnswers.length > currentQuestionIndex;

  useEffect(() => {
    // Reset local input when the question changes
    setSelectedAnswer('');
  }, [question]);

  const handleAnswer = (answer: string) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer.trim() || isAnswered) return;
    handleAnswer(selectedAnswer.trim());
  };

  const renderInput = () => {
    if (question.type === QuestionType.MultipleChoice) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnswered) return;
                setSelectedAnswer(option);
                handleAnswer(option);
              }}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 transform font-semibold border-2 
                ${isAnswered && question.answer === option
                  ? 'bg-[#00DFA2] text-black border-[#00DFA2] scale-105 shadow-lg' // Correct answer shown after answering
                  : isAnswered && userAnswers[currentQuestionIndex] === option
                  ? 'bg-pink-200 dark:bg-[#FF0060]/50 text-black dark:text-white border-[#FF0060] scale-100' // Incorrect answer shown
                  : 'bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800 hover:bg-gray-100/70 dark:hover:bg-neutral-800/70 hover:border-[#00DFA2]'}
                ${isAnswered ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2]`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    return (
      <input
        type="text"
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        disabled={isAnswered}
        placeholder="Type your answer here..."
        className="w-full bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-lg p-4 text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 transition-colors disabled:opacity-50"
        autoFocus
      />
    );
  };
  
  const isTextEntryQuestion = question.type === QuestionType.ShortAnswer || question.type === QuestionType.ImageQuestion;

  return (
    <div className="w-full max-w-2xl p-6 md:p-8 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-800/50">
      {question.type === QuestionType.ImageQuestion && question.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden border-2 border-[#0079FF]/50 shadow-lg">
          <img src={question.imageUrl} alt="AI-generated quiz image" className="w-full h-auto object-cover" />
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
        {question.question}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">{renderInput()}</div>
        {isTextEntryQuestion && (
          <button
            type="submit"
            disabled={!selectedAnswer || isAnswered}
            className="w-full bg-gradient-to-r from-[#FF0060] to-[#F6FA70] text-black dark:text-white font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6FA70] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
          >
            {isAnswered ? 'Thinking...' : 'Confirm Answer'}
          </button>
        )}
      </form>
    </div>
  );
};

export default QuestionCard;