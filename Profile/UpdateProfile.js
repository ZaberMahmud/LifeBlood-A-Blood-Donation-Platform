import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUser, FaSave, FaArrowLeft, FaHome, FaBriefcase,
  FaCheckCircle
} from 'react-icons/fa';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const { state } = useLocation();
  const [user, setUser] = useState(state?.user || {
    name: '',
    email: '',
    mobile: '',
    bloodType: '',
    age: '',
    gender: '',
    presentAddress: '',
    permanentAddress: '',
    occupation: '',
    education: '',
    interests: '',
    hobbies: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const navigate = useNavigate();

  const calculateCompletion = (userData) => {
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

    return Math.round(
      ((completedRequired / requiredFields.length) * 0.7 + 
      (completedOptional / optionalFields.length) * 0.3) * 100
    );
  };

  useEffect(() => {
    setCompletionPercentage(calculateCompletion(user));
  }, [user]);

  const getCompletionColor = () => {
    if (completionPercentage >= 90) return '#4cd137';
    if (completionPercentage >= 70) return '#fbc531';
    return '#e84118';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      localStorage.setItem('updatedUser', JSON.stringify(user));
      navigate('/profile');
    } catch (error) {
      console.error('Update failed:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="update-profile-container">
      <div className="update-profile-header">
        <button 
          className="back-button"
          onClick={() => navigate('/profile')}
        >
          <FaArrowLeft /> Back to Profile
        </button>
        <h1>Edit Profile</h1>
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
          {completionPercentage >= 80 && 'Great job! Your profile is almost complete.'}
          {completionPercentage === 100 && 'Perfect! Your profile is 100% complete.'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="update-profile-form">
        {error && <div className="update-error">{error}</div>}

        <div className="form-section">
          <h2><FaUser /> Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label>Mobile Number <span className="required">*</span></label>
              <input
                type="tel"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Blood Type <span className="required">*</span></label>
              <select
                name="bloodType"
                value={user.bloodType}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                min="18"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2><FaHome /> Address Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Present Address</label>
              <textarea
                name="presentAddress"
                value={user.presentAddress}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Permanent Address</label>
              <textarea
                name="permanentAddress"
                value={user.permanentAddress}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2><FaBriefcase /> Personal Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={user.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Education</label>
              <input
                type="text"
                name="education"
                value={user.education}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Interests</label>
              <input
                type="text"
                name="interests"
                value={user.interests}
                onChange={handleChange}
                placeholder="Separate with commas"
              />
            </div>
            <div className="form-group">
              <label>Hobbies</label>
              <input
                type="text"
                name="hobbies"
                value={user.hobbies}
                onChange={handleChange}
                placeholder="Separate with commas"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="save-button"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (
              <>
                <FaSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;