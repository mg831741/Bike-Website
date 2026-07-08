import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Team from "../components/Team";

function TeamPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", paddingTop: "90px" }}>
        <Team />
      </div>
      <Footer />
    </>
  );
}

export default TeamPage;
