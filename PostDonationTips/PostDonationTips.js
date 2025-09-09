import React, { useState } from 'react';
import { 
  FaHeartbeat, FaGlassWhiskey, FaBandAid, 
  FaHamburger, FaWineGlassAlt,
  FaTint, FaClock, FaCalendarDay, FaBed,
  FaRunning, FaSwimmingPool, FaUtensils,
  FaRegSmile, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './PostDonationTips.css';

const PostDonationTips = () => {
  const [activePhase, setActivePhase] = useState('immediate');
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const tipsData = {
    immediate: [
      {
        title: 'Initial Rest Period',
        content: 'Remain seated for 15-20 minutes after donation.',
        detail: 'This helps prevent dizziness and allows your circulatory system to adjust.',
        icon: <FaBed className="icon" />,
      },
      {
        title: 'Hydration Protocol',
        content: 'Drink at least 500ml of fluids before leaving.',
        detail: 'Water, juice, or electrolyte drinks help restore plasma volume quickly.',
        icon: <FaGlassWhiskey className="icon" />,
      },
      {
        title: 'Bandage Management',
        content: 'Keep pressure bandage for 4-5 hours.',
        detail: 'It helps clotting at the needle site. After removal, clean area with soap and water.',
        icon: <FaBandAid className="icon" />,
      },
      {
        title: 'Physical Restrictions',
        content: 'No heavy lifting with donation arm for 12 hours.',
        detail: 'The vein needs time to heal completely. Use your other arm for carrying items.',
        icon: <FaRunning className="icon" />,
      },
      {
        title: 'Self-Monitoring',
        content: 'Watch for dizziness or fatigue.',
        detail: 'Sit or lie down immediately if feeling faint. Symptoms usually pass within 30 minutes.',
        icon: <FaHeartbeat className="icon" />,
      },
    ],
    '24-hours': [
      {
        title: 'Iron Replenishment',
        content: 'Consume iron-rich foods at two meals.',
        detail: 'Sources: red meat, spinach, lentils, fortified cereals. Pair with vitamin C.',
        icon: <FaHamburger className="icon" />,
      },
      {
        title: 'Alcohol Avoidance',
        content: 'No alcohol for 24 hours post-donation.',
        detail: 'Alcohol delays recovery and increases dizziness risk.',
        icon: <FaWineGlassAlt className="icon" />,
      },
      {
        title: 'Fluid Continuation',
        content: 'Drink 25% more fluids than usual.',
        detail: 'Pale yellow urine = good hydration. Add electrolytes if sweating heavily.',
        icon: <FaTint className="icon" />,
      },
      {
        title: 'Exercise Moderation',
        content: 'Limit to light activities only.',
        detail: 'Walking or stretching is fine. Avoid running, weights, or competitive sports.',
        icon: <FaSwimmingPool className="icon" />,
      },
      {
        title: 'Rest Prioritization',
        content: 'Get 7-8 hours of quality sleep.',
        detail: 'Your body regenerates most blood cells during sleep.',
        icon: <FaRegSmile className="icon" />,
      },
    ],
    '1-week': [
      {
        title: 'Hydration Maintenance',
        content: 'Continue extra fluids for 3-5 days.',
        detail: 'Plasma volume is restored in ~48 hours, but fluids support full recovery.',
        icon: <FaGlassWhiskey className="icon" />,
      },
      {
        title: 'Iron Optimization',
        content: 'Include iron in every meal.',
        detail: 'It takes 4–6 weeks to replace donated red cells. Combine with vitamin C.',
        icon: <FaUtensils className="icon" />,
      },
      {
        title: 'Exercise Progression',
        content: 'Gradually return to normal workouts.',
        detail: 'Start at 50% intensity and build up over 3-4 days.',
        icon: <FaRunning className="icon" />,
      },
      {
        title: 'Energy Awareness',
        content: 'Full energy returns in 2-3 weeks.',
        detail: 'Don’t push through fatigue. Rest or nap when needed.',
        icon: <FaHeartbeat className="icon" />,
      },
      {
        title: 'Next Donation Planning',
        content: 'Eligible again in 8 weeks.',
        detail: 'Whole blood donors can donate every 56 days. Set a reminder for your next one.',
        icon: <FaCalendarDay className="icon" />,
      },
    ]
  };

  return (
    <div className="recovery-guide">
      <div className="guide-header">
        <h1>Post-Donation Care Guide</h1>
        <p>Essential tips to help your body recover after donating blood</p>
      </div>

      <div className="phase-tabs">
        <button 
          className={`tab ${activePhase === 'immediate' ? 'active' : ''}`}
          onClick={() => setActivePhase('immediate')}
        >
          <FaClock /> First Hours
        </button>
        <button 
          className={`tab ${activePhase === '24-hours' ? 'active' : ''}`}
          onClick={() => setActivePhase('24-hours')}
        >
          <FaClock /> Next 24h
        </button>
        <button 
          className={`tab ${activePhase === '1-week' ? 'active' : ''}`}
          onClick={() => setActivePhase('1-week')}
        >
          <FaCalendarDay /> Full Week
        </button>
      </div>

      <div className="tips-grid">
        {tipsData[activePhase].map((tip, index) => (
          <div 
            key={index} 
            className={`tip-card ${expandedTip === index ? 'expanded' : ''}`}
            onClick={() => toggleTip(index)}
          >
            <div className="tip-header">
              <div className="tip-icon-container">
                {tip.icon}
              </div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
              <div className="expand-icon">
                {expandedTip === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {expandedTip === index && (
              <div className="tip-detail">
                <p>{tip.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="motivational-banner">
        <div className="banner-content">
          <h3>Your Donation Makes a Difference</h3>
          <p>Each blood donation can save up to 3 lives. Thank you for being a hero!</p>
        </div>
      </div>
    </div>
  );
};

export default PostDonationTips;
