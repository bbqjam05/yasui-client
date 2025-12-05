import React, { useState } from 'react';
import axios from 'axios';
import MainPage from './components/MainPage';
import QuizSettings from './components/QuizSettings';
import QuizPage from './components/QuizPage';
import QuizResultPage from './components/QuizResultPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'settings', 'quiz', 'results'
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // 배포 환경이면 환경변수 사용, 로컬이면 localhost:5000 사용
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleEnterSettings = () => {
    setCurrentPage('settings');
  };

  const handleGoHome = () => {
    setCurrentPage('main');
    setQuizSettings(null);
    setQuizData(null);
    setQuizResults(null);
  };

  const handleQuizStart = async (settings) => {
    try {
      setQuizSettings(settings); // 원래 설정은 UI용으로 저장

      const response = await axios.post(`${API_URL}/api/quiz/generate`, settings);
      
      setQuizData(response.data);
      setCurrentPage('quiz');

    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

    const handleQuizComplete = async (userAnswers) => {
      try {
        let serverQuizType;
        if (quizSettings.quizType === '발음') {
          serverQuizType = 'pronunciation';
        } else if (quizSettings.quizType === '뜻') {
          serverQuizType = 'meaning';
        }
  
        const response = await axios.post(`${API_URL}/api/quiz/validate`, {
          quizType: serverQuizType,
          answers: userAnswers,
        });
        setQuizResults(response.data);
        setCurrentPage('results');
      } catch (error) {
        console.error('Error validating quiz:', error);
      }
    };
  const handleReset = () => {
    setCurrentPage('settings');
    setQuizSettings(null);
    setQuizData(null);
    setQuizResults(null);
  };

  const handleRetry = () => {
    // 저장된 설정(quizSettings)으로 퀴즈 시작 함수를 호출하여
    // 서버로부터 새로운 문제 데이터를 받아오도록 변경
    if (quizSettings) {
      handleQuizStart(quizSettings);
    }
    setQuizResults(null);
  }

  return (
    <>
      {/* 1. 메인 페이지일 때 */}
      {currentPage === 'main' && (
        <MainPage onStart={handleEnterSettings} />
      )}

      {/* 2. 메인 페이지가 아닐 때 (설정, 풀이, 결과) */}
      {currentPage !== 'main' && (
        <>
          {/* (중요) 홈 버튼은 여기에 위치해야 함 (app-container 밖, 조건문 안) */}
          <div className="home-logo-btn" onClick={handleGoHome}>
            Yasui Practice
          </div>

          <div className="app-container">
            {currentPage === 'settings' && <QuizSettings onQuizStart={handleQuizStart} />}
            {currentPage === 'quiz' && <QuizPage quizData={quizData} onQuizComplete={handleQuizComplete} />}
            {currentPage === 'results' && <QuizResultPage results={quizResults} onRetry={handleRetry} onReset={handleReset} />}
          </div>
        </>
      )}
    </>
  );
}

export default App;
