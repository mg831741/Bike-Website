import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

function GalleryPage() {
  return (
    <>

      <Navbar />

      <div className="page-banner">
        <h1>Garage Gallery</h1>
      </div>

      <Gallery />

      <Footer />

    </>
  );
}

export default GalleryPage;