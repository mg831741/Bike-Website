import servicesData from "../data/servicesData";
import "../styles/services.css";

function Services() {

  return (
    <section className="services" id="services">

      <h2>Our Services</h2>

      <div className="service-grid">

        {servicesData.map((service) => (

          <div className="card" key={service.id}>

            <h1>{service.icon}</h1>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Services;