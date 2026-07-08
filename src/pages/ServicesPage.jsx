import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";

function ServicesPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", paddingTop: "90px" }}>
        <Services />
      </div>
      <Footer />
    </>
  );
}

export default ServicesPage;