import "../styles/gallery.css";
import galleryData from "../data/galleryData";

function Gallery() {
  return (
    <section className="gallery" id="gallery">

      <h2>Garage Gallery</h2>

      <div className="gallery-grid">

        {galleryData.map((item) => (
          <img key={item.id} src={item.image} alt={item.title} />
        ))}

      </div>

    </section>
  );
}

export default Gallery;