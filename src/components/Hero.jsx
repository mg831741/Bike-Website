import { Link } from "react-router-dom";
import "../styles/hero.css";

function Hero() {

  return (

    <section className="hero">

      <div className="overlay">

        <span className="hero-tag">[ PREMIUM RESTORATION & PERFORMANCE ]</span>

        <h1>
          Best Bike Service Center
        </h1>

        <p>
          Professional Bike Repair &
          Modification
        </p>

        <Link to="/services" className="neon-button">
          Explore Services
        </Link>

        <div className="hero-quick-links">
          <Link to="/booking" className="hero-quick-btn">Book a Service</Link>
          <Link to="/ai-customizer" className="hero-quick-btn ai-btn">AI Customizer</Link>
          <Link to="/gallery" className="hero-quick-btn">View Gallery</Link>
        </div>

      </div>

    </section>

  );
}

export default Hero;