import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

function ServicesPage() {
  return (
    <>

      <Navbar />

      <div className="page-banner">
        <h1>Our Services</h1>
      </div>

      <Services />

      <Footer />

    </>
  );
}

export default ServicesPage;