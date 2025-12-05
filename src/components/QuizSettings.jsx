import React, { useState } from 'react';

const QuizSettings = ({ onQuizStart }) => {
  const [level, setLevel] = useState('N3');
  const [quizType, setQuizType] = useState('발음');
  const [count, setCount] = useState(10);

  const handleStartQuiz = () => {
    onQuizStart({ level, quizType, count });
  };

  return (
    <div className="quiz-settings">
      <h2>퀴즈 설정</h2>
      <div className="quiz-section">
        <label>어휘 등급</label>
        <select className="quiz-select" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
        </select>
      </div>
      <div className="quiz-section">
        <label>문제 유형</label>
        <select className="quiz-select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
          <option value="발음">발음 (한글로 적기)</option>
          <option value="뜻">뜻</option>
        </select>
      </div>
      <div className="quiz-section">
        <label>문제 개수</label>
        <select className="quiz-select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <button className="quiz-button quiz-button-primary" onClick={handleStartQuiz}>시작하기</button>
    </div>
  );
};

export default QuizSettings;
