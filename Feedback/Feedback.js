import React, { useState, useEffect } from 'react';
import styles from './Feedback.module.css';
import { 
  FaStar, FaRegStar, FaComment, 
  FaCheck, FaSmile, FaFrown, FaMeh,
  FaThumbsUp, FaGift, FaFire 
} from 'react-icons/fa';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Feedback = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
    hoverRating: 0,
    mood: ''
  });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateConfetti, setAnimateConfetti] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/getUserDetails', {
          withCredentials: true
        });
        setUser(response.data);
        
        // Load saved feedbacks for this user
        const savedFeedbacks = JSON.parse(localStorage.getItem(`feedbacks_${response.data._id}`)) || [];
        setSubmittedFeedbacks(savedFeedbacks);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleRating = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  const handleMoodSelect = (mood) => {
    setFeedback(prev => ({ ...prev, mood }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.comment) return;

    const newFeedback = {
      id: Date.now(),
      name: user.name,
      rating: feedback.rating,
      mood: feedback.mood,
      comment: feedback.comment,
      date: new Date().toLocaleString(),
      userId: user._id
    };

    const updatedFeedbacks = [newFeedback, ...submittedFeedbacks];
    
    // Save to state and localStorage
    setSubmittedFeedbacks(updatedFeedbacks);
    localStorage.setItem(`feedbacks_${user._id}`, JSON.stringify(updatedFeedbacks));
    
    // Visual feedback
    setAnimateConfetti(true);
    setIsSubmitted(true);
    
    // Reset form
    setFeedback({
      rating: 0,
      comment: '',
      hoverRating: 0,
      mood: ''
    });

    // Reset confetti after animation
    setTimeout(() => setAnimateConfetti(false), 3000);
  };

  const getMoodIcon = (mood) => {
    switch(mood) {
      case 'happy': return <FaSmile className={styles.happyMood} />;
      case 'neutral': return <FaMeh className={styles.neutralMood} />;
      case 'unhappy': return <FaFrown className={styles.unhappyMood} />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your feedback history...</p>
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      {/* Confetti animation */}
      <AnimatePresence>
        {animateConfetti && (
          <motion.div 
            className={styles.confettiContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.confetti}
                initial={{ y: -10, x: Math.random() * 100 - 50, opacity: 0 }}
                animate={{ 
                  y: [0, 100],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              >
                {i % 3 === 0 ? <FaStar /> : <FaGift />}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className={styles.feedbackForm}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Share Your Experience</h2>
          <p className={styles.subtitle}>Help us improve our service</p>
          <div className={styles.userBadge}>
            <span className={styles.userIcon}>👤</span>
            <span className={styles.userName}>{user?.name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.ratingSection}>
            <label>How would you rate your experience?</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.span
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleRating(star)}
                  className={styles.star}
                >
                  {star <= feedback.rating ? (
                    <FaStar className={styles.filledStar} />
                  ) : (
                    <FaRegStar className={styles.emptyStar} />
                  )}
                </motion.span>
              ))}
            </div>
          </div>

          <div className={styles.moodSection}>
            <label>How did this make you feel?</label>
            <div className={styles.moodOptions}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.moodButton} ${feedback.mood === 'happy' ? styles.active : ''}`}
                onClick={() => handleMoodSelect('happy')}
              >
                <FaSmile /> Happy
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.moodButton} ${feedback.mood === 'neutral' ? styles.active : ''}`}
                onClick={() => handleMoodSelect('neutral')}
              >
                <FaMeh /> Neutral
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.moodButton} ${feedback.mood === 'unhappy' ? styles.active : ''}`}
                onClick={() => handleMoodSelect('unhappy')}
              >
                <FaFrown /> Unhappy
              </motion.button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="comment">
              <FaComment /> Share your thoughts...
            </label>
            <textarea
              id="comment"
              value={feedback.comment}
              onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
              required
              rows="5"
              placeholder="What did you like or what could we improve?"
            />
          </div>

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={!feedback.comment}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {feedback.rating >= 4 ? (
              <><FaThumbsUp /> Submit Positive Feedback</>
            ) : feedback.rating <= 2 ? (
              <><FaFire /> Submit Critical Feedback</>
            ) : (
              <><FaComment /> Submit Feedback</>
            )}
          </motion.button>
        </form>
      </motion.div>

      <div className={styles.feedbacksList}>
        <div className={styles.listHeader}>
          <h3>Your Feedback History</h3>
          <span className={styles.feedbackCount}>{submittedFeedbacks.length} entries</span>
        </div>
        
        {submittedFeedbacks.length === 0 ? (
          <div className={styles.emptyState}>
            <FaComment className={styles.emptyIcon} />
            <p>No feedback submitted yet</p>
            <p>Be the first to share your thoughts!</p>
          </div>
        ) : (
          <AnimatePresence>
            {submittedFeedbacks.map((item) => (
              <motion.div
                key={item.id}
                className={styles.feedbackItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div className={styles.feedbackHeader}>
                  <div className={styles.feedbackMeta}>
                    <div className={styles.ratingDisplay}>
                      {[...Array(5)].map((_, i) => (
                        i < item.rating ? 
                          <FaStar key={i} className={styles.filledStar} /> : 
                          <FaRegStar key={i} className={styles.emptyStar} />
                      ))}
                    </div>
                    {item.mood && (
                      <span className={styles.moodDisplay}>
                        {getMoodIcon(item.mood)}
                      </span>
                    )}
                  </div>
                  <div className={styles.feedbackDate}>{item.date}</div>
                </div>
                <p className={styles.feedbackText}>{item.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Feedback;