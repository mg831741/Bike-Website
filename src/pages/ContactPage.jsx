import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", paddingTop: "90px" }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;