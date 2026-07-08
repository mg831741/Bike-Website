import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import TeamPage from "./pages/TeamPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import FeedbackPage from "./pages/FeedbackPage";
import AICustomizer from "./pages/AICustomizer";
import DynamicBackground from "./components/DynamicBackground";

function App() {

  return (
    <Router>
      <DynamicBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/ai-customizer" element={<AICustomizer />} />
      </Routes>
    </Router>
  );

}

export default App;