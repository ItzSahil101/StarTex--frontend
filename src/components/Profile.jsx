import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader"; // Import the Loader component
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        setLoading(false); // Stop loader
        return;
      }

      try {
        const response = await axios.post(
          "https://star-tex-backend.vercel.app/api/userDet",
          { token }
        );

        const { userName, email, bio } = response.data.details;

        setUserDetails({
          username: userName || "Unknown User",
          email: email || "No email provided",
          bio: bio || "Hello, Everyone",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Stop loader after fetching
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = () => {
    navigate("/edit");
  };

  if (loading) {
    return <Loader />; // Show the Loader while data is being fetched
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="edit-icon" onClick={handleEditClick}>
          <i className="fas fa-pen"></i>
        </div>
        <img
          src="https://cdn.vectorstock.com/i/500p/37/34/user-profile-icon-social-media-vector-51113734.jpg"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <div className="profile-field">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              readOnly
            />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              readOnly
            />
          </div>
          <div className="profile-field">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={userDetails.bio}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
