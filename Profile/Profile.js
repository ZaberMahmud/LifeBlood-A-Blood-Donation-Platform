import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaTint, FaSignOutAlt, 
  FaEdit, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaBirthdayCake, FaHome,
  FaHeart, FaBook, FaRunning,
  FaBriefcase, FaGlobe, FaCheckCircle
} from 'react-icons/fa';
import './Profile.css';
import SocialShare from '../Shared/SocialShare';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const navigate = useNavigate();

  const calculateCompletion = useCallback((userData) => {
    if (!userData) return 0;
    
    const requiredFields = [
      'name',
      'email',
      'mobile',
      'bloodType'
    ];

    const optionalFields = [
      'age',
      'gender',
      'presentAddress',
      'permanentAddress',
      'occupation',
      'education',
      'interests',
      'hobbies'
    ];

    const completedRequired = requiredFields.filter(field => 
      userData[field] && userData[field].toString().trim() !== ''
    ).length;

    const completedOptional = optionalFields.filter(field => 
      userData[field] && userData[field].toString().trim() !== ''
    ).length;

    // Weighted calculation (required fields count more)
    return Math.round(
      ((completedRequired / requiredFields.length) * 0.7 + 
      (completedOptional / optionalFields.length) * 0.3) * 100
    );
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const localUser = localStorage.getItem('updatedUser');
      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
        setCompletionPercentage(calculateCompletion(parsedUser));
        setIsLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:3001/api/auth/getUserDetails', {
        withCredentials: true,
      });
      setUser(response.data);
      setCompletionPercentage(calculateCompletion(response.data));
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, calculateCompletion]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {
        withCredentials: true,
      });
      localStorage.removeItem('updatedUser');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const getCompletionColor = () => {
    if (completionPercentage >= 90) return '#4cd137';
    if (completionPercentage >= 70) return '#fbc531';
    return '#e84118';
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="profile-loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <p>Failed to load profile data. Please try again later.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h1>{user.name}</h1>
          <div className="blood-type-badge">
            <FaTint /> {user.bloodType || 'Not specified'}
          </div>
        </div>
      </div>

      <div className="completion-meter">
        <div className="completion-header">
          <FaCheckCircle 
            className="completion-icon" 
            style={{ color: getCompletionColor() }} 
          />
          <span>Profile Completion</span>
          <div className="completion-percentage">
            {completionPercentage}%
          </div>
        </div>
        <div className="meter-container">
          <div 
            className="meter-fill"
            style={{ 
              width: `${completionPercentage}%`,
              background: getCompletionColor()
            }}
          ></div>
        </div>
        <div className="completion-tip">
          {completionPercentage < 50 && 'Complete more fields to improve your profile!'}
          {completionPercentage >= 50 && completionPercentage < 80 && 'Looking good! Just a few more details.'}
          {completionPercentage >= 80 && completionPercentage < 100 &&'Great job! Your profile is almost complete.'}
          {completionPercentage === 100 && 'Perfect! Your profile is 100% complete.'}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2><FaUser /> Basic Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>{user.email || 'Not provided'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h4>Mobile</h4>
                <p>{user.mobile || 'Not provided'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaBirthdayCake className="info-icon" />
              <div>
                <h4>Age</h4>
                <p>{user.age || 'Not specified'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaGlobe className="info-icon" />
              <div>
                <h4>Gender</h4>
                <p>{user.gender || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2><FaHome /> Address Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Present Address</h4>
                <p>{user.presentAddress || 'Not provided'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaHome className="info-icon" />
              <div>
                <h4>Permanent Address</h4>
                <p>{user.permanentAddress || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2><FaHeart /> Personal Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaBriefcase className="info-icon" />
              <div>
                <h4>Occupation</h4>
                <p>{user.occupation || 'Not specified'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaBook className="info-icon" />
              <div>
                <h4>Education</h4>
                <p>{user.education || 'Not specified'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaHeart className="info-icon" />
              <div>
                <h4>Interests</h4>
                <p>{user.interests || 'Not specified'}</p>
              </div>
            </div>
            <div className="info-item">
              <FaRunning className="info-icon" />
              <div>
                <h4>Hobbies</h4>
                <p>{user.hobbies || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="edit-profile-btn"
            onClick={() => navigate('/update-profile', { state: { user } })}
          >
            <FaEdit /> Update Profile
          </button>
          
          <SocialShare profileName={user.name} />
          
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;