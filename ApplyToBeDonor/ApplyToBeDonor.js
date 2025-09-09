import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ApplyToBeDonor.css';

const ApplyToBeDonor = () => {
  const [formData, setFormData] = useState({
    bloodType: '',
    age: '',
    location: '',
    contact: '',
    lastDonation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3001/api/auth/getUserDetails', {
          withCredentials: true,
        });
        setUser(response.data);
        
        // Pre-fill form with user data
        setFormData(prev => ({
          ...prev,
          contact: response.data.mobile || response.data.email || ''
        }));
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('You must be logged in to apply as a donor');
      navigate('/login');
      return;
    }
    
    try {
      // Get existing donors from localStorage
      const existingDonors = JSON.parse(localStorage.getItem('availableDonors')) || [];
      
      // Check if user already applied
      const alreadyApplied = existingDonors.some(donor => donor.userId === user._id || donor.email === user.email);
      
      if (alreadyApplied) {
        alert('You have already applied to be a donor!');
        return;
      }
      
      // Add new donor with user info
      const newDonor = {
        id: Date.now(), // Simple unique ID
        userId: user._id, // Store user ID from backend
        name: user.name,
        email: user.email,
        ...formData,
        applicationDate: new Date().toLocaleDateString(),
        status: 'Pending' // Application status
      };
      
      // Save updated donors list
      localStorage.setItem('availableDonors', JSON.stringify([...existingDonors, newDonor]));
      
      // Reset form and show success message
      setFormData({
        bloodType: '',
        age: '',
        location: '',
        contact: '',
        lastDonation: ''
      });
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error saving donor application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="blood-drop-loader"></div>
        <p>Loading your information...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-screen">
        <p>You must be logged in to apply as a donor.</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  return (
    <div className="apply-donor-container">
      <h2>Apply to Become a Blood Donor</h2>
      <p className="user-welcome">Welcome, {user.name}! Complete your donor application below.</p>
      
      {submitted && <div className="success-message">Application submitted successfully!</div>}
      
      <form onSubmit={handleSubmit} className="donor-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            disabled
            className="disabled-field"
          />
          <small>Name from your profile</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="bloodType">Blood Type:</label>
          <select
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
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
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="65"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City or area"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contact">Contact Info:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone number"
            required
          />
          <small>We'll use this to contact you for donations</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="lastDonation">Last Donation Date (if any):</label>
          <input
            type="date"
            id="lastDonation"
            name="lastDonation"
            value={formData.lastDonation}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyToBeDonor;