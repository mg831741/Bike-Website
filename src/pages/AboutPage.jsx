import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <>

      <Navbar />

      <div className="page-banner">
        <h1>About Us</h1>
      </div>

      <About />

      <Footer />

    </>
  );
}

export default AboutPage;