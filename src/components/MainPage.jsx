const MainPage = ({ onStart }) => {
  return (
    <div className="main-page-container">
      <h1 className="main-title">Yasui Practice</h1>
      <p className="main-description">
        YasuiPractice에서 JLPT 출제 어휘를<br/>
        쉽고, 간편하게, 무료로 공부하세요!
      </p>
      <button 
        className="quiz-button quiz-button-primary main-start-button" 
        onClick={onStart}
      >
        퀴즈 시작하기
      </button>
    </div>
  );
};

export default MainPage;
