import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import reviewsData from "../data/reviewsData";
import "../styles/feedbackPage.css";

function FeedbackPage() {
  const [name, setName] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  // Initialize reviews from localStorage or load from reviewsData
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("mg_garage_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load reviews from local storage", e);
      }
    }
    // Fallback: Map the initial hardcoded reviews to include model/date
    return reviewsData.map((rev, index) => ({
      id: rev.id,
      name: rev.name,
      bikeModel: index === 0 ? "KTM Duke 390" : index === 1 ? "Royal Enfield Bullet" : "Yamaha R15",
      review: rev.review,
      rating: rev.rating.length || 5, // Count stars from string
      date: "05-July-2026"
    }));
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mg_garage_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !bikeModel || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      bikeModel,
      review: comment,
      rating,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).replace(/ /g, "-")
    };

    setReviews([newReview, ...reviews]);
    alert("Thank you! Your feedback has been posted successfully.");
    
    // Reset form
    setName("");
    setBikeModel("");
    setRating(5);
    setComment("");
  };

  return (
    <>
      <Navbar />

      <div className="feedback-page-container">
        {/* Feedback Input Card */}
        <div className="feedback-card">
          <h2>Share Your Feedback</h2>
          <p className="feedback-subtitle">
            Your review helps us refine our tuning and modification services to keep your rides smooth.
          </p>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-row-grid">
              <div className="form-group-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-field">
                <label>Bike Model</label>
                <input
                  type="text"
                  placeholder="e.g. Pulsar 220, Bullet 350"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Glowing Star Rating Selector */}
            <div className="rating-select-group">
              <label>Service Rating</label>
              <div className="stars-selector-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${rating >= star ? "active" : ""}`}
                    onClick={() => setRating(star)}
                    title={`${star} Star${star > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group-field">
              <label>Your Comments</label>
              <textarea
                placeholder="Share your servicing, repair, or modification experience..."
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="feedback-submit-btn">
              Submit Review
            </button>
          </form>
        </div>

        {/* Live Reviews Feed */}
        <div className="reviews-feed-container">
          <h3>Customer Reviews ({reviews.length})</h3>
          
          {reviews.map((rev) => (
            <div className="feedback-feed-item" key={rev.id}>
              <div className="feed-item-header">
                <div className="feed-user-info">
                  <h4>{rev.name}</h4>
                  <span className="bike-label">🏍️ {rev.bikeModel}</span>
                </div>
                <div className="feed-stars">
                  {"★".repeat(rev.rating)}
                  {"☆".repeat(5 - rev.rating)}
                </div>
              </div>
              <p className="feed-comment">"{rev.review}"</p>
              <div className="feed-date">{rev.date}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FeedbackPage;
