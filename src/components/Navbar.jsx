import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          <img
            src="/image/logo.png"
            alt="MG Garage Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/services">Services</Link>
        </li>

        <li>
          <Link to="/gallery">Gallery</Link>
        </li>

        <li>
          <Link to="/team">Team</Link>
        </li>

        <li>
          <Link to="/ai-customizer">AI Customizer</Link>
        </li>

        <li>
          <Link to="/booking">Booking</Link>
        </li>

        <li>
          <Link to="/feedback">Feedback</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/login" className="nav-login-btn">Login</Link>
        </li>

      </ul>

    </nav>

  );
}

export default Navbar;