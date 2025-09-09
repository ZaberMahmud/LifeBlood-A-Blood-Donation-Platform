import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaMap, FaSearch } from 'react-icons/fa';
import './DonationCenters.css';

const DonationCenters = () => {
  const allCenters = [
    {
      id: 1,
      name: "Lab One Blood Bank",
      address: "123 Medical Street, Dhaka 1000",
      contact: "+880 1234 567890",
      location: "https://maps.app.goo.gl/cduWSHKCucTdcW566",
      hours: "8:00 AM - 8:00 PM (Daily)"
    },
    {
      id: 2,
      name: "Red Crescent Blood Center",
      address: "7, 5 Aurangajeb Rd, Mohammadpur,Dhaka",
      contact: "+880 9876 543210",
      location: "https://maps.app.goo.gl/3rydLb3EFvbNR1Xf8",
      hours: "9:00 AM - 5:00 PM (Sat-Thu)"
    },
    {
      id: 3,
      name: "City General Hospital Ltd.",
      address: "73/A Airport Road, Dhaka",
      contact: "+880 1122 334455",
      location: "https://maps.app.goo.gl/Eb5HzNJcB9yK1fTv6",
      hours: "24/7 Emergency Services"
    },
    {
      id: 4,
      name: "Quantum Blood Lab",
      address: "31/V Shilpacharya Zainul Abedin Sarak, Shantinagar, 1217",
      contact: "+880 1713 000222",
      location: "https://maps.app.goo.gl/2XsvWd6k5QEMr3X57",
      hours: "9:00 AM - 9:00 PM (Daily)"
    },
    {
      id: 5,
      name: "Sandhani, Dhaka Medical College",
      address: "Dhaka Medical College Hospital, Dhaka 1000",
      contact: "+880 1711 002211",
      location: "https://maps.app.goo.gl/4ZzvBGA5WJEm77zY6",
      hours: "8:00 AM - 4:00 PM (Sat-Thu)"
    },
    {
      id: 6,
      name: "Red Crescent Society Blood Bank",
      address: "Boro Moghbazar, Dhaka",
      contact: "+880 1711 223344",
      location: "https://maps.google.com/maps?q=23.7495,90.4076",
      hours: "9:00 AM - 5:00 PM (Sun-Thu)"
    },
    {
      id: 7,
      name: "LABAID Specialized Hospital",
      address: "26 Green Rd, Dhanmondi, Dhaka 1205",
      contact: "+880 1714 556677",
      location: "https://maps.app.goo.gl/Aj13jw3jFGqcuSZZ8",
      hours: "24/7 Emergency Services"
    },
    {
      id: 8,
      name: "Popular Diagnostic Centre",
      address: "H, 21 Road-7, Uttara, Dhaka 1230",
      contact: "+880 1933 445566",
      location: "https://maps.app.goo.gl/ZCFENKrmonPFA23C8",
      hours: "9:00 AM - 10:00 PM (Daily)"
    },
    {
      id: 9,
      name: "Islami Bank Blood Bank",
      address: "Kakrail, Dhaka",
      contact: "+880 1711 778899",
      location: "https://maps.google.com/maps?q=23.7380,90.4126",
      hours: "8:30 AM - 4:30 PM (Sun-Thu)"
    },
    {
      id: 10,
      name: "National Institute of Cancer Blood Bank",
      address: "Mohakhali, Dhaka 1212",
      contact: "+880 1712 334455",
      location: "https://maps.app.goo.gl/f4GmJU7ZXuhYPHvy9",
      hours: "8:00 AM - 2:00 PM (Sun-Thu)"
    }
  ];

  const [search, setSearch] = useState("");

  const filteredCenters = allCenters.filter(center =>
    center.name.toLowerCase().includes(search.toLowerCase()) ||
    center.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleLocationClick = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="donation-centers-container">
      <h1>🩸 Blood Donation Centers in Dhaka</h1>
      <p className="subtitle">Find a center near you to donate or receive blood.</p>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="centers-list">
        {filteredCenters.length > 0 ? (
          filteredCenters.map(center => (
            <div key={center.id} className="center-card">
              <h2>{center.name}</h2>
              <div className="center-info">
                <p><FaMapMarkerAlt className="icon" /> {center.address}</p>
                <p><FaPhone className="icon" /> {center.contact}</p>
                <p>{center.hours}</p>
              </div>
              <div className="center-actions">
                <button
                  onClick={() => handleLocationClick(center.location)}
                  className="action-btn map-btn"
                >
                  <FaMap /> Directions
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No centers found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default DonationCenters;
