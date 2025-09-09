import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQEducation.css';

const FAQEducation = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Most people in good health, aged 18-65, weighing at least 50kg (110 lbs) can donate. Donors must meet specific health criteria and should not have any infectious diseases or recent risky exposures."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made more frequently - up to 24 times per year with at least 7 days between donations."
    },
    {
      question: "Does blood donation hurt?",
      answer: "You may feel a brief pinch when the needle is inserted, but the donation process itself is generally painless. Most donors compare it to a slight pinch lasting just a second."
    },
    {
      question: "How long does a blood donation take?",
      answer: "The actual donation takes about 8-10 minutes for whole blood. The entire process (registration, health screening, donation, and recovery) takes about 45 minutes to an hour."
    },
    {
      question: "Is it safe to donate blood?",
      answer: "Absolutely. Sterile, disposable equipment is used for each donor, making the process completely safe. You cannot contract any disease by donating blood."
    },
    {
      question: "What should I do before donating?",
      answer: "Eat a healthy meal, drink plenty of fluids (especially water), get a good night's sleep, and bring your ID. Avoid fatty foods right before donation as they can affect blood tests."
    },
    {
      question: "What blood types are most needed?",
      answer: "All blood types are needed, but type O-negative (the universal donor) is especially valuable as it can be given to patients of any blood type in emergency situations."
    },
    {
      question: "Can I donate if I have a tattoo or piercing?",
      answer: "Yes, but only if it was done at a licensed facility in your state and at least 4 months have passed. This ensures any potential infection would be detectable."
    }
  ];

  const bloodFacts = [
    "One donation can save up to 3 lives",
    "Your body replaces the donated blood within 4-8 weeks",
    "Type O-negative blood is the universal donor type",
    "Blood cannot be manufactured - it only comes from donors",
    "Cancer patients often need platelet donations",
    "You can donate plasma every 28 days",
    "Blood has a shelf life of only 42 days",
    "About 1 in 7 people entering a hospital need blood"
  ];

  return (
    <div className="faq-education-container">
      <h1>Blood Donation Education Center</h1>
      
      <section className="education-section">
        <h2>Blood Donation Facts</h2>
        <div className="facts-grid">
          {bloodFacts.map((fact, index) => (
            <div key={index} className="fact-card">
              <div className="fact-icon">💉</div>
              <p>{fact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="toggle-icon">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="blood-types-section">
        <h2>Blood Type Compatibility</h2>
        <div className="compatibility-chart">
          <table>
            <thead>
              <tr>
                <th>Your Blood Type</th>
                <th>Can Donate To</th>
                <th>Can Receive From</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A+</td>
                <td>A+, AB+</td>
                <td>A+, A-, O+, O-</td>
              </tr>
              <tr>
                <td>A-</td>
                <td>A+, A-, AB+, AB-</td>
                <td>A-, O-</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>B+, AB+</td>
                <td>B+, B-, O+, O-</td>
              </tr>
              <tr>
                <td>B-</td>
                <td>B+, B-, AB+, AB-</td>
                <td>B-, O-</td>
              </tr>
              <tr>
                <td>AB+</td>
                <td>AB+</td>
                <td>All Blood Types</td>
              </tr>
              <tr>
                <td>AB-</td>
                <td>AB+, AB-</td>
                <td>AB-, A-, B-, O-</td>
              </tr>
              <tr>
                <td>O+</td>
                <td>O+, A+, B+, AB+</td>
                <td>O+, O-</td>
              </tr>
              <tr>
                <td>O-</td>
                <td>All Blood Types</td>
                <td>O-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FAQEducation;