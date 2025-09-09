import { useState, useEffect } from 'react';
import { FaTint, FaArrowRight, FaInfoCircle, FaHeartbeat, FaSyringe, FaUsers, FaQuestionCircle } from 'react-icons/fa';
import './BloodCompatibilityGuide.css';

const BloodCompatibilityGuide = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [animationActive, setAnimationActive] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Blood type compatibility data with additional facts
  const compatibilityData = {
    'A+': {
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      facts: [
        '34% of people have A+ blood',
        'Preferred donation: Whole blood or platelets',
        'A+ platelets are in high demand'
      ],
      rarity: 'Common'
    },
    'A-': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      facts: [
        'Only 6% of people have A- blood',
        'Can donate to all A and AB types',
        'Often needed for pediatric patients'
      ],
      rarity: 'Somewhat rare'
    },
    'B+': {
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      facts: [
        '9% of people have B+ blood',
        'Preferred donation: Whole blood or plasma',
        'B+ plasma is always needed'
      ],
      rarity: 'Less common'
    },
    'B-': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      facts: [
        'Only 2% of people have B- blood',
        'One of the rarest blood types',
        'Highly needed for specific ethnic groups'
      ],
      rarity: 'Very rare'
    },
    'AB+': {
      canDonateTo: ['AB+'],
      canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      facts: [
        'Universal recipient - can receive from any type',
        'Only 3% of people have AB+ blood',
        'Plasma from AB+ donors is universal'
      ],
      rarity: 'Rare'
    },
    'AB-': {
      canDonateTo: ['AB+', 'AB-'],
      canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
      facts: [
        'The rarest blood type - only 1% of people',
        'Plasma from AB- donors is universal',
        'Highly needed for neonatal care'
      ],
      rarity: 'Extremely rare'
    },
    'O+': {
      canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
      canReceiveFrom: ['O+', 'O-'],
      facts: [
        'Most common blood type - 37% of people',
        'Universal donor to all positive types',
        'Most frequently requested by hospitals'
      ],
      rarity: 'Very common'
    },
    'O-': {
      canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      canReceiveFrom: ['O-'],
      facts: [
        'Universal donor - most needed type',
        'Only 7% of people have O- blood',
        'Often used in emergencies and for newborns'
      ],
      rarity: 'Rare'
    }
  };

  // Animation for blood cells
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBloodTypeSelect = (bloodType) => {
    setSelectedBloodType(bloodType);
    setQuizResult(null);
    setQuizFeedback(null);
  };

  const checkQuizAnswer = () => {
    if (!selectedBloodType || !quizAnswer) return;
    
    const userAnswer = quizAnswer.trim().toUpperCase();
    const correctAnswers = compatibilityData[selectedBloodType].canDonateTo;
    const isCorrect = correctAnswers.includes(userAnswer);
    
    setQuizResult(isCorrect);
    setShowQuiz(false);
    
    if (!isCorrect) {
      setQuizFeedback(`Correct answers: ${correctAnswers.join(', ')}`);
    } else {
      setQuizFeedback(null);
    }
  };

  return (
    <div className="compatibility-guide">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <FaTint className="pulse" /> Blood Compatibility Guide
          </h1>
          <p>Discover who you can help and who can help you in times of need</p>
        </div>
        <div className={`blood-cells ${animationActive ? 'animate' : ''}`}>
          <div className="blood-cell cell-1"></div>
          <div className="blood-cell cell-2"></div>
          <div className="blood-cell cell-3"></div>
        </div>
      </div>

      <div className="blood-type-selector">
        <h2>Select your blood type:</h2>
        <div className="blood-type-grid">
          {Object.keys(compatibilityData).map((bloodType) => (
            <button
              key={bloodType}
              className={`blood-type-btn ${selectedBloodType === bloodType ? 'active' : ''}`}
              onClick={() => handleBloodTypeSelect(bloodType)}
            >
              {bloodType}
              <span className="blood-drop"></span>
            </button>
          ))}
        </div>
      </div>

      {selectedBloodType && (
        <>
          <div className="compatibility-results">
            <div className="compatibility-card donate">
              <h3><FaSyringe /> You can donate to:</h3>
              <div className="blood-types">
                {compatibilityData[selectedBloodType].canDonateTo.map((type) => (
                  <span key={`donate-${type}`} className="blood-type-tag">
                    {type}
                  </span>
                ))}
              </div>
              <div className="compatibility-stats">
                <div className="stat-item">
                  <FaHeartbeat />
                  <span>Rarity: {compatibilityData[selectedBloodType].rarity}</span>
                </div>
              </div>
            </div>

            <div className="compatibility-arrow">
              <FaArrowRight />
            </div>

            <div className="compatibility-card receive">
              <h3><FaUsers /> You can receive from:</h3>
              <div className="blood-types">
                {compatibilityData[selectedBloodType].canReceiveFrom.map((type) => (
                  <span key={`receive-${type}`} className="blood-type-tag">
                    {type}
                  </span>
                ))}
              </div>
              <button 
                className="quiz-btn" 
                onClick={() => {
                  setShowQuiz(true);
                  setQuizAnswer('');
                  setQuizResult(null);
                }}
              >
                <FaQuestionCircle /> Quick Quiz
              </button>
            </div>
          </div>

          <div className="blood-facts">
            <h3><FaInfoCircle /> Interesting Facts</h3>
            <ul>
              {compatibilityData[selectedBloodType].facts.map((fact, index) => (
                <li key={`fact-${index}`}>{fact}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {showQuiz && selectedBloodType && (
        <div className="quiz-modal">
          <div className="quiz-content">
            <h3>Quick Knowledge Check</h3>
            <p>Name one blood type that {selectedBloodType} can donate to:</p>
            <input
              type="text"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              placeholder="Enter blood type (e.g., AB+)"
              onKeyPress={(e) => e.key === 'Enter' && checkQuizAnswer()}
            />
            <div className="quiz-buttons">
              <button onClick={checkQuizAnswer}>Submit</button>
              <button onClick={() => {
                setShowQuiz(false);
                setQuizFeedback(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {quizResult !== null && (
        <div className={`quiz-result ${quizResult ? 'correct' : 'incorrect'}`}>
          {quizResult ? (
            '✅ Correct!'
          ) : (
            <>
              ❌ Incorrect!
              {quizFeedback && <div className="correct-answers">{quizFeedback}</div>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodCompatibilityGuide;