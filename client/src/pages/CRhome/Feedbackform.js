import React, { useState } from 'react';

const Feedbackform = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = async (starValue) => {
    try {
      const response = await fetch('http://localhost:3000/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: starValue })
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        setRating(starValue); 
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    console.log('Submitting rating:', rating);
    setRating(0);
  };

  return (
    <div className="star-feedback-container">
      <h2 className="star-feedback-heading">Rate Your Experience</h2>
      <div className="star-container">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            className={`star ${starValue <= rating ? 'active' : ''}`}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        ))}
      </div>
      <p className="rating-text">Your Rating: {rating}</p>
      <button className="submit-button" onClick={handleSubmitRating}>Submit Rating</button>
    </div>
  );
};

export default Feedbackform;

// CSS 

const styles = `
.star-feedback-container {
  text-align: center;
  margin-bottom: 20px;
}

.star-feedback-heading {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.star-container {
  display: inline-block;
  font-size: 24px;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s ease-in-out;
}

.star.active {
  color: #fdd835; /* Material Design Yellow 600 */
}

.rating-text {
  margin-top: 10px;
  font-size: 18px;
  color: #666;
}

.submit-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* Bootstrap primary color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #0056b3; /* Darker shade of Bootstrap primary color */
}
`;

// Inject CSS into the DOM
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);