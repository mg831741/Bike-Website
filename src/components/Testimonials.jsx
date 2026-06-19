import reviewsData from "../data/reviewsData";

function Testimonials() {

  return (
    <section className="testimonials">

      <h2>Customer Reviews</h2>

      {reviewsData.map((item) => (

        <div className="review" key={item.id}>

          <h3>{item.name}</h3>

          <p>{item.rating}</p>

          <p>{item.review}</p>

        </div>

      ))}

    </section>
  );
}

export default Testimonials;