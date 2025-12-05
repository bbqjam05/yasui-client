import React, { useState } from 'react';

const QuizPage = ({ quizData, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentUserAnswer, setCurrentUserAnswer] = useState('');
  const [allUserAnswers, setAllUserAnswers] = useState([]);

  const handleNextQuestion = () => {
    const newAnswer = {
      wordId: quizData[currentQuestionIndex]._id,
      userAnswer: currentUserAnswer,
    };
    const updatedAnswers = [...allUserAnswers, newAnswer];
    setAllUserAnswers(updatedAnswers);
    setCurrentUserAnswer('');

    if (currentQuestionIndex === quizData.length - 1) {
      onQuizComplete(updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!quizData || quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  // 이 return 문이 최종 수정본입니다.
  return (
    <div className="quiz-page">
      {/* 1. 이 <h2> 태그가 누락된 부분이었습니다. */}
      <h2 className="quiz-section">{currentQuestion.word}</h2>

      {/* 2. 3:1 비율 레이아웃입니다. */}
      <div className="quiz-input-group">
        <input
          type="text"
          className="quiz-input"
          value={currentUserAnswer}
          onChange={(e) => setCurrentUserAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNextQuestion()} 
          placeholder="답을 입력하세요"
        />
        <button className="quiz-button quiz-button-primary" onClick={handleNextQuestion}>
          {isLastQuestion ? '제출' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;