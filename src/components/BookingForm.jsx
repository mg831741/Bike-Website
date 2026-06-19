// BookingForm.jsx

function BookingForm() {
  return (
    <section className="booking" id="booking">

      <h2>Book Your Service</h2>

      <form className="booking-form">

        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="tel"
          placeholder="Phone Number"
        />

        <input
          type="text"
          placeholder="Bike Model"
        />

        <select>

          <option>
            Select Service
          </option>

          <option>
            Engine Repair
          </option>

          <option>
            Oil Change
          </option>

          <option>
            Bike Washing
          </option>

          <option>
            Modification
          </option>

        </select>

        <input type="date" />

        <textarea
          placeholder="Additional Details"
          rows="5"
        ></textarea>

        <button type="submit">
          Book Appointment
        </button>

      </form>

    </section>
  );
}

export default BookingForm;