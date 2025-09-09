import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './EligibilityQuiz.css';

const EligibilityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(Array(10).fill(null));

  const questions = [
    {
      question: "Are you between 18-65 years old?",
      correctAnswer: true,
      explanation: "Donors must be between 18-65 years old to donate blood."
    },
    {
      question: "Do you weigh at least 50kg (110 lbs)?",
      correctAnswer: true,
      explanation: "Donors must weigh at least 50kg to ensure safe donation."
    },
    {
      question: "Have you donated blood in the last 3 months?",
      correctAnswer: false,
      explanation: "You must wait at least 3 months between whole blood donations."
    },
    {
      question: "Have you had a tattoo or piercing in the last 4 months?",
      correctAnswer: false,
      explanation: "You must wait 4 months after getting a tattoo or piercing."
    },
    {
      question: "Are you feeling healthy and well today?",
      correctAnswer: true,
      explanation: "You should be in good health on the day of donation."
    },
    {
      question: "Have you had major surgery in the last 6 months?",
      correctAnswer: false,
      explanation: "You must wait 6 months after major surgery."
    },
    {
      question: "Do you have low iron levels or anemia?",
      correctAnswer: false,
      explanation: "Donors must have adequate iron levels to donate."
    },
    {
      question: "Have you traveled to a malaria-risk area in the last 3 months?",
      correctAnswer: false,
      explanation: "Travel to certain countries may require a waiting period."
    },
    {
      question: "Have you had a cold or flu in the last week?",
      correctAnswer: false,
      explanation: "You should be symptom-free for at least 1 week."
    },
    {
      question: "Are you currently taking antibiotics?",
      correctAnswer: false,
      explanation: "You must finish antibiotic treatment before donating."
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswers(Array(10).fill(null));
  };

  return (
    <div className="quiz-container">
      <h2>Blood Donation Eligibility Quiz</h2>
      
      {!showResult ? (
        <div className="question-card">
          <div className="progress">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <h3>{questions[currentQuestion].question}</h3>
          
          <div className="answer-buttons">
            <button 
              className={`answer-btn ${answers[currentQuestion] === true ? 'selected' : ''}`}
              onClick={() => handleAnswer(true)}
            >
              <FaCheck /> Yes
            </button>
            <button 
              className={`answer-btn ${answers[currentQuestion] === false ? 'selected' : ''}`}
              onClick={() => handleAnswer(false)}
            >
              <FaTimes /> No
            </button>
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h3>Your Results</h3>
          <div className="score">
            You scored {score} out of {questions.length}
          </div>
          <div className={`eligibility ${score >= 8 ? 'eligible' : 'ineligible'}`}>
            {score >= 8 ? 'You are likely eligible to donate!' : 'You may not be eligible to donate.'}
          </div>
          
          <div className="answers-review">
            {questions.map((q, index) => (
              <div key={index} className={`answer-item ${answers[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                <p>Your answer: {answers[index] ? 'Yes' : 'No'}</p>
                <p className="explanation">{q.explanation}</p>
              </div>
            ))}
          </div>
          
          <button className="restart-btn" onClick={restartQuiz}>
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

export default EligibilityQuiz;