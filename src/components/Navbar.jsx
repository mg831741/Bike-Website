import "../styles/navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="logo">

        <img
          src="/images/logo.png"
          alt="logo"
        />

        <h1>BIKE GARAGE</h1>

      </div>

      <ul>

        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#services">
            Services
          </a>
        </li>

        <li>
          <a href="#gallery">
            Gallery
          </a>
        </li>

        <li>
          <a href="#contact">
            Contact
          </a>
        </li>

        <li>
          <a href="#booking">
            Booking
          </a>
        </li>

      </ul>

    </nav>

  );
}

export default Navbar;