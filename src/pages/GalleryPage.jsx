import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

function GalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", paddingTop: "90px" }}>
        <Gallery />
      </div>
      <Footer />
    </>
  );
}

export default GalleryPage;