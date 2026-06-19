import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <>

      <Navbar />

      <div className="page-banner">
        <h1>Contact Us</h1>
      </div>

      <Contact />

      <Footer />

    </>
  );
}

export default ContactPage;