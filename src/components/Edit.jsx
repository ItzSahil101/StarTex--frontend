import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader"; // Import the Loader component
import "./Profile.css";

const Edit = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    pass: "",
    bio: "",
    id: "",
  });
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Show loader while fetching
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        setLoading(false); // Stop loader
        return;
      }

      try {
        const response = await axios.post("https://star-tex-backend.vercel.app/api/userDet", {
          token,
        });

        const { userName, bio, pass, _id } = response.data.details;

        setUserDetails({
          username: userName || "Unknown User",
          pass: pass || "No email provided",
          bio: bio || "Hello, Everyone",
          id: _id || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    const { username, pass, bio, id } = userDetails;

    // Validation
    if (!username || !pass || !bio) {
      alert("Please fulfill all fields.");
      return;
    }
    if (username.length < 6 || username.length > 15) {
      alert("Username must be between 6 and 15 characters.");
      return;
    }
    if (pass.length < 8 || pass.length > 15) {
      alert("Password must be between 8 and 15 characters.");
      return;
    }
    if (bio.length < 7 || bio.length > 80) {
      alert("Bio must be between 7 and 80 characters.");
      return;
    }

    setLoading(true); // Show loader while updating
    try {
      const response = await axios.post("https://star-tex-backend.vercel.app/api/update", {
        username,
        pass,
        bio,
        id,
      });

      if (response.status === 200) {
        alert("Successfully updated!");
        navigate("/profile");
      } else {
        alert("Failed to update. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleBackClick = () => {
    navigate("/profile");
  };

  if (loading) {
    return <Loader />; // Show the Loader during fetch or update
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 style={{ fontWeight: "700" }}>Edit Profile</h2>
        <div className="back-icon" onClick={handleBackClick}>
          <i className="fas fa-times"></i>
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
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Password:</label>
            <input
              type="text"
              name="pass"
              value={userDetails.pass}
              onChange={handleChange}
            />
          </div>
          <div className="profile-field">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={userDetails.bio}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
