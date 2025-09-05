
import React, { useMemo } from 'react';
import { QuestionType, Vibe } from '../types';
import { useGame } from '../context/GameContext';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-[#00DFA2]" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 dark:text-[#FF0060]" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.697a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 dark:text-[#F6FA70]" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);


const ANSWER_TIMED_OUT = '__TIMES_UP__';

const ResultsScreen: React.FC = () => {
  const { state, dispatch } = useGame();
  const { questions, userAnswers, time, vibe, isDemoMode } = state;

  const { score, correctAnswers } = useMemo(() => {
    if (questions.length === 0) return { score: 0, correctAnswers: 0 };
    const correct = userAnswers.filter(
      (answer, index) => answer.toLowerCase() === questions[index].answer.toLowerCase()
    ).length;
    const scoreValue = Math.round((correct / questions.length) * 100);
    return { score: scoreValue, correctAnswers: correct };
  }, [questions, userAnswers]);

  const { title, level, tip, color } = useMemo(() => {
    if (score >= 80) return { title: "Cosmic Voyager", level: "You're orbiting Jupiter!", tip: "You're clearly in the zone. Time to write a poem about a sentient bag of chips or solve the mysteries of the universe. Your snack of choice: anything that crunches.", color: "text-teal-600 dark:text-[#00DFA2]" };
    if (score >= 50) return { title: "Pleasantly Puzzled", level: "You've got a nice buzz going.", tip: "You're in that perfect state of giggly confusion. Put on some music with a funky bassline and watch a documentary about jellyfish. It'll all make sense. Maybe.", color: "text-yellow-500 dark:text-[#F6FA70]" };
    return { title: "Grounded", level: "Your feet are firmly on Earth.", tip: "You're as sharp as a tack. If you're looking to take off, try a funny movie. If you're happy here, a glass of cold water and a walk outside are calling your name.", color: "text-blue-600 dark:text-[#0079FF]" };
  }, [score]);
  
  let nextVibeInfo: { text: string; buttonText: string; nextVibe: Vibe } | null = null;
  if (vibe === Vibe.Buzzed) nextVibeInfo = { text: "The journey continues...", buttonText: "Level Up: Try 'Toasted'", nextVibe: Vibe.Toasted };
  else if (vibe === Vibe.Toasted) nextVibeInfo = { text: "You're getting warmer...", buttonText: "Go Deeper: Try 'Voyager'", nextVibe: Vibe.Voyager };
  
  const handleRestart = () => dispatch({ type: 'RESTART_GAME' });
  // Fix: The payload for 'CONTINUE_TO_NEXT_VIBE' must be an object containing both the new vibe and the current AI personality.
  const handleContinue = (nextVibe: Vibe) => dispatch({ type: 'CONTINUE_TO_NEXT_VIBE', payload: { vibe: nextVibe, aiPersonality: state.aiPersonality } });
  
  const handleShare = async () => {
    const shareData = {
      title: 'High Score Quiz',
      text: `I scored ${score}% on the High Score quiz and my official level is "${level}". Think you can do better?`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(twitterUrl, '_blank');
      }
    } catch (err) {
      console.error('Error sharing score:', err);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  return (
    <div className="w-full max-w-3xl p-4 sm:p-6 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-800/50 animate-card-fade-in-up">
      {isDemoMode && (
          <div className="text-center mb-6 bg-yellow-400/20 text-yellow-600 dark:text-[#F6FA70] py-2 px-4 rounded-lg border border-yellow-500/30">
              <p className="font-semibold">This is a score from Demo Mode.</p>
              <p className="text-sm">For the full, dynamic experience, try a real game!</p>
          </div>
      )}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className={`text-4xl sm:text-5xl font-bold ${color}`}>{title}</p>
        <p className="text-2xl text-neutral-600 dark:text-neutral-300 mt-2">{level}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center mb-8">
        <div className="bg-gray-100 dark:bg-neutral-900/50 p-4 rounded-lg"><p className="text-sm text-neutral-600 dark:text-neutral-300">Final Score</p><p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#00DFA2] to-[#F6FA70] text-transparent bg-clip-text">{score}%</p></div>
        <div className="bg-gray-100 dark:bg-neutral-900/50 p-4 rounded-lg"><p className="text-sm text-neutral-600 dark:text-neutral-300">Correct Answers</p><p className="text-2xl sm:text-3xl font-bold">{correctAnswers} / {questions.length}</p></div>
        <div className="bg-gray-100 dark:bg-neutral-900/50 p-4 rounded-lg"><p className="text-sm text-neutral-600 dark:text-neutral-300">Total Time</p><p className="text-2xl sm:text-3xl font-bold">{new Date(time * 1000).toISOString().substr(14, 5)}</p></div>
      </div>
      
      <div className="bg-gray-100 dark:bg-neutral-900/50 p-6 rounded-lg mb-8 text-center"><h3 className="text-xl font-semibold text-teal-600 dark:text-[#00DFA2] mb-2">Cosmic Advice</h3><p className="text-neutral-600 dark:text-neutral-300">{tip}</p></div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-4">Your Answers</h3>
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {questions.map((q, i) => {
              const userAnswer = userAnswers[i] || "";
              const isTimedOut = userAnswer === ANSWER_TIMED_OUT;
              const isCorrect = userAnswer.toLowerCase() === q.answer.toLowerCase();
              
              const borderColor = isCorrect ? '#00DFA2' : (isTimedOut ? '#F59E0B' : '#FF0060');

              const renderUserAnswer = () => {
                  if (isTimedOut) {
                      return <><ClockIcon /><p className="ml-2 text-yellow-600 dark:text-yellow-400">Time's up</p></>;
                  }
                  if (isCorrect) {
                      return <><CheckIcon /><p className="ml-2 text-neutral-600 dark:text-neutral-300">{userAnswer}</p></>;
                  }
                  return <><XIcon /><p className={`ml-2 text-pink-600 dark:text-[#FF0060] line-through`}>{userAnswer}</p></>;
              }

              return (
                <div key={i} className="bg-gray-100/80 dark:bg-neutral-900/50 p-4 rounded-lg border-l-4" style={{ borderColor }}>
                    <div className="flex items-start gap-4">
                        {q.type === QuestionType.ImageQuestion && q.imageUrl && <img src={q.imageUrl} alt="Quiz image thumbnail" className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>}
                        <div className="flex-grow">
                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">{q.question}</p>
                            <div className="flex items-center mt-2">{renderUserAnswer()}</div>
                            {!isCorrect && <p className="text-teal-600 dark:text-[#00DFA2] mt-1">Correct answer: {q.answer}</p>}
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 italic mt-2">{q.explanation}</p>
                        </div>
                    </div>
                </div>
              )
            })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {nextVibeInfo && !isDemoMode && <button onClick={() => handleContinue(nextVibeInfo.nextVibe)} className="w-full bg-gradient-to-r from-[#FF0060] to-[#F6FA70] text-black dark:text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF0060]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6FA70] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black">{nextVibeInfo.buttonText}</button>}
        <div className="flex flex-col md:flex-row gap-4">
            <button onClick={handleRestart} className="w-full bg-[#0079FF] hover:bg-[#005cbf] text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black">Play Again</button>
            <button onClick={handleShare} className="w-full bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black">Share Score</button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
