import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the auth token
    navigate("/login"); // Redirect to the login page (adjust this route as needed)
  };

  const handleViewProfile = () => {
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          style={{ fontWeight: "800", fontSize: "23px" }}
          className="navbar-brand"
          to="#"
        >
          StarTex
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowSidebar(!showSidebar)} // Toggle sidebar on click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showSidebar ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                style={{ color: "purple", fontWeight: "600" }}
                className="nav-link active"
                aria-current="page"
                to="/home"
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                FAQs & Feedback
              </Link>
            </li>
          </ul>
          {/* Profile Icon */}
          <div className="d-flex align-items-center position-relative">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundImage: `url('https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
              onClick={() => setShowSidebar(!showSidebar)}
            ></div>
            {/* Sidebar */}
            {showSidebar && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  width: "200px", // Slightly increased width
                  backgroundColor: "#333",
                  color: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  zIndex: 1000,
                }}
              >
                {/* Close Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowSidebar(false)}
                  >
                    ✕
                  </button>
                </div>
                <button
                  style={{
                    display: "block",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    textAlign: "left",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                <button
                  style={{
                    display: "block",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    textAlign: "left",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
