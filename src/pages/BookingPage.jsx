import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", paddingTop: "90px" }}>
        <BookingForm />
      </div>
      <Footer />
    </>
  );
}

export default BookingPage;
