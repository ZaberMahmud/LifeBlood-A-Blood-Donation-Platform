import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaTimes } from 'react-icons/fa';
import './SocialShare.css';

const SocialShare = ({ donationCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const defaultMessage = `I just donated blood ${donationCount ? `for the ${donationCount}${getOrdinalSuffix(donationCount)} time` : ''}! ❤️ #SaveLives #LifeBlood`;

  const shareOnFacebook = () => {
    const message = customMessage || defaultMessage;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const message = customMessage || defaultMessage;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const getOrdinalSuffix = (num) => {
    const j = num % 10, k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  return (
    <div className={`social-share-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="share-button" 
          onClick={() => setIsOpen(true)}
        >
          Share My Donation!
        </button>
      ) : (
        <div className="share-dialog">
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
          
          <h3>Share Your Achievement</h3>
          
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder={defaultMessage}
            className="message-input"
          />
          
          <div className="social-buttons">
            <button onClick={shareOnFacebook} className="facebook-button">
              <FaFacebook /> Share on Facebook
            </button>
            
            <button onClick={shareOnTwitter} className="twitter-button">
              <FaTwitter /> Share on Twitter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;