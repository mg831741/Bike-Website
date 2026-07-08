import { useState } from "react";
import "../styles/booking.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: "",
    service: "",
    date: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.model || !formData.service || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Thank you, ${formData.name}! Your service appointment for ${formData.model} (${formData.service}) has been booked for ${formData.date}.`);
    setFormData({
      name: "",
      phone: "",
      model: "",
      service: "",
      date: "",
      details: "",
    });
  };

  return (
    <section className="booking" id="booking">

      <h2>Book Your Service</h2>

      <form className="booking-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Bike Model (e.g., Pulsar 220)"
          value={formData.model}
          onChange={handleChange}
          required
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          <option value="Engine Repair">Engine Repair</option>
          <option value="Oil Change">Oil Change</option>
          <option value="Bike Washing">Bike Washing</option>
          <option value="Modification">Modification</option>
          <option value="Tyre Service">Tyre Service</option>
          <option value="Dent Painting">Dent Painting</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="details"
          placeholder="Additional Details (Optional)"
          rows="5"
          value={formData.details}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Book Appointment
        </button>

      </form>

    </section>
  );
}

export default BookingForm;