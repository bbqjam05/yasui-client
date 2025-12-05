import React from 'react';

const QuizResultPage = ({ results, onRetry, onReset }) => {
  if (!results) {
    return <div>Loading results...</div>;
  }

  const correctCount = results.filter(r => r.isCorrect).length;
  const totalCount = results.length;
  const posMap = { noun: '명사', verb: '동사', adjective: '형용사', adverb: '부사' };

  return (
    <div className="quiz-page">
      <h2 className="score-display">총 점수 : {correctCount} / {totalCount}</h2>

      <div className="result-list-container">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            {/* 1. 번호 */}
            <div className="result-col" style={{ fontWeight: 'bold', width: '40px' }}>{index + 1}</div>

            {/* 2. 정답/오답 */}
            <div className={`result-col ${result.isCorrect ? 'text-correct' : 'text-incorrect'}`} style={{ width: '60px' }}>
              {result.isCorrect ? '정답' : '오답'}
            </div>

            {/* 3. 문제 (한자) */}
            <div className="result-col" style={{ fontWeight: 'bold', color: '#333' }}>
              {result.correctAnswer.word}
            </div>

            {/* 4. 히라가나 (Reading) */}
            <div className="result-col">
              {result.correctAnswer.reading}
            </div>

            {/* 5. 품사 (Part of Speech) - 데이터가 없으면 '-' 표시 */}
            <div className="result-col">
              {posMap[result.correctAnswer.partOfSpeech] || result.correctAnswer.partOfSpeech || '-'}
            </div>

            {/* 6. 발음 (Hangeul) */}
            <div className="result-col">
              {result.correctAnswer.hangeul}
            </div>

            {/* 7. 뜻 (Meaning) */}
            <div className="result-col">
              {result.correctAnswer.meaning}
            </div>

            {/* 8. 제출한 답 (User Answer) - 오답일 경우 빨간색 강조 */}
            <div className={`result-col ${!result.isCorrect ? 'text-incorrect' : ''}`} style={{ fontWeight: 'bold' }}>
              {result.userAnswer}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 그룹 (기존 유지) */}
      <div className="quiz-button-group">
        <button className="quiz-button quiz-button-primary" onClick={onRetry}>다시 시도하기</button>
        <button className="quiz-button quiz-button-secondary" onClick={onReset}>퀴즈 재설정</button>
      </div>
    </div>
  );
};

export default QuizResultPage;
