import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/loginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("customer@mggarage.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock customer and vehicle status details
  const mockCustomer = {
    name: "Mukesh Gautam",
    bikeModel: "Royal Enfield Classic 350 (White)",
    bikeNumber: "MH-31-EQ-9876",
    serviceType: "Full Engine Tuning & Custom Exhaust Installation",
    costEstimate: "₹14,500",
    deliveryDate: "July 8, 2026",
    mechanic: "Rahul Sharma & Mukesh Gautam",
    currentStep: 2, // 0: Received, 1: Diagnostic, 2: Servicing, 3: Ready
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Accept any login details for demo purposes, but set default check
    setIsLoggedIn(true);
    setError("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("customer@mggarage.com");
    setPassword("password");
  };

  return (
    <>
      <Navbar />

      <div className="login-page-container">
        {!isLoggedIn ? (
          // Login Form Card
          <div className="login-card">
            <h2>Customer Login</h2>
            <p className="login-subtitle">
              Enter your registered credentials to track your bike's real-time service status.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="login-form-group">
                <label>Email Address / Mobile</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Log In</button>
            </form>
          </div>
        ) : (
          // Customer Dashboard Card
          <div className="login-card dashboard-card">
            <div className="dashboard-header">
              <h3>MG Garage Live Tracker</h3>
              <p>Welcome back, {mockCustomer.name}!</p>
            </div>

            {/* Progress Tracker */}
            <div className="progress-tracker">
              {/* Colored tracker line based on current step */}
              <div
                className="progress-line-fill"
                style={{ width: `${mockCustomer.currentStep * 33.3}%` }}
              ></div>

              <div className={`progress-step ${mockCustomer.currentStep >= 0 ? (mockCustomer.currentStep > 0 ? "completed" : "active") : ""}`}>
                <div className="step-node">1</div>
                <div className="step-label">Received</div>
              </div>
              <div className={`progress-step ${mockCustomer.currentStep >= 1 ? (mockCustomer.currentStep > 1 ? "completed" : "active") : ""}`}>
                <div className="step-node">2</div>
                <div className="step-label">Diagnostic</div>
              </div>
              <div className={`progress-step ${mockCustomer.currentStep >= 2 ? (mockCustomer.currentStep > 2 ? "completed" : "active") : ""}`}>
                <div className="step-node">3</div>
                <div className="step-label">Servicing</div>
              </div>
              <div className={`progress-step ${mockCustomer.currentStep >= 3 ? (mockCustomer.currentStep > 3 ? "completed" : "active") : ""}`}>
                <div className="step-node">4</div>
                <div className="step-label">Ready</div>
              </div>
            </div>

            {/* Bike Servicing details */}
            <div className="bike-status-info">
              <h4>Bike Status: In Progress</h4>
              <div className="bike-status-grid">
                <div className="status-label">Motorcycle Model:</div>
                <div className="status-value">{mockCustomer.bikeModel}</div>

                <div className="status-label">Vehicle Plate:</div>
                <div className="status-value">{mockCustomer.bikeNumber}</div>

                <div className="status-label">Service Ordered:</div>
                <div className="status-value">{mockCustomer.serviceType}</div>

                <div className="status-label">Mechanics Assigned:</div>
                <div className="status-value">{mockCustomer.mechanic}</div>

                <div className="status-label">Cost Estimate:</div>
                <div className="status-value">{mockCustomer.costEstimate}</div>

                <div className="status-label">Est. Completion:</div>
                <div className="status-value">{mockCustomer.deliveryDate}</div>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout Dashboard
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default LoginPage;
