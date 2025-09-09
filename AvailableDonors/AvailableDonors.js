import React, { useState, useEffect } from 'react';
import './AvailableDonors.css';

const AvailableDonors = () => {
  const [donors, setDonors] = useState([]);
  const [filterBloodType, setFilterBloodType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    // Load donors from localStorage on component mount
    const storedDonors = JSON.parse(localStorage.getItem('availableDonors')) || [];
    setDonors(storedDonors);
  }, []);

  const handleViewDetails = (donor) => {
    setSelectedDonor(donor);
  };

  const handleCloseModal = () => {
    setSelectedDonor(null);
  };

  const filteredDonors = donors
    .filter(donor => {
      const matchesBloodType = filterBloodType ? donor.bloodType === filterBloodType : true;
      const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           donor.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBloodType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const bloodTypeCounts = donors.reduce((acc, donor) => {
    acc[donor.bloodType] = (acc[donor.bloodType] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="available-donors-container">
      <header className="donors-header">
        <h1>Available Blood Donors</h1>
        <p>Find and connect with willing blood donors in your area</p>
      </header>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{donors.length}</h3>
          <p>Total Donors</p>
        </div>
        {Object.entries(bloodTypeCounts).map(([type, count]) => (
          <div key={type} className="stat-card">
            <h3>{count}</h3>
            <p>{type} Donors</p>
          </div>
        ))}
      </div>
      
      <div className="controls-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search donors by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label htmlFor="bloodTypeFilter">Filter by Blood Type:</label>
            <select
              id="bloodTypeFilter"
              value={filterBloodType}
              onChange={(e) => setFilterBloodType(e.target.value)}
            >
              <option value="">All Types</option>
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
          
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      )}
      
      {filteredDonors.length === 0 ? (
        <div className="no-donors">
          <div className="no-donors-icon">💔</div>
          <h3>No donors found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="donors-grid">
          {filteredDonors.map(donor => (
            <div key={donor.id} className="donor-card">
              <div className="donor-header">
                <div className="blood-type-badge">{donor.bloodType}</div>
                <div className="donor-status available">Available</div>
              </div>
              
              <div className="donor-info">
                <h3>{donor.name}</h3>
                <div className="info-row">
                  <span className="label">Location:</span>
                  <span className="value">{donor.location}</span>
                </div>
                <div className="info-row">
                  <span className="label">Age:</span>
                  <span className="value">{donor.age} years</span>
                </div>
                <div className="info-row">
                  <span className="label">Last Donation:</span>
                  <span className="value">{donor.lastDonation || 'Not specified'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Applied on:</span>
                  <span className="value">{donor.applicationDate}</span>
                </div>
              </div>
              
              <div className="donor-actions">
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewDetails(donor)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedDonor && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="donor-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>×</button>
            <h2>{selectedDonor.name}'s Details</h2>
            <div className="modal-content">
              <div className="modal-row">
                <span className="modal-label">Blood Type:</span>
                <span className="modal-value blood-type">{selectedDonor.bloodType}</span>
              </div>
              <div className="modal-row">
                <span className="modal-label">Age:</span>
                <span className="modal-value">{selectedDonor.age} years</span>
              </div>
              <div className="modal-row">
                <span className="modal-label">Location:</span>
                <span className="modal-value">{selectedDonor.location}</span>
              </div>
              <div className="modal-row">
                <span className="modal-label">Contact:</span>
                <span className="modal-value contact-info">{selectedDonor.contact}</span>
              </div>
              {selectedDonor.lastDonation && (
                <div className="modal-row">
                  <span className="modal-label">Last Donation:</span>
                  <span className="modal-value">{selectedDonor.lastDonation}</span>
                </div>
              )}
              <div className="modal-row">
                <span className="modal-label">Applied on:</span>
                <span className="modal-value">{selectedDonor.applicationDate}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="contact-btn">Contact Donor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableDonors;