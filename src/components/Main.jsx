import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const MainPage = () => {
  const history = useNavigate();
  const [filter, setFilter] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "creative",
    url: "",
  });
  const [posts, setPosts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch posts based on filter
  const fetchPosts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://star-tex-backend.vercel.app/api/getPosts?category=${filter}`
      );
      const posts = response.data.data;
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle publish
  const handlePublish = async () => {
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.url
      ) {
        alert("Please fill in all fields before publishing.");
        return;
      }

      setLoading(true); // Start loading
      const token = localStorage.getItem("auth");
      await axios.post("https://star-tex-backend.vercel.app/api/createPost", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post published successfully!");
      setFormData({
        title: "",
        description: "",
        category: "creative",
        url: "",
      });
      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish the post.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Debounced filter handler
  const handleFilterChange = (item) => {
    clearTimeout(debounceTimeout);

    if (item.toLowerCase() === "my post") {
      history("/mypost");
    } else {
      const timeout = setTimeout(() => {
        setFilter(item);
        setShowSidebar(false);
      }, 500);
      setDebounceTimeout(timeout);
    }
  };

  // Effect to fetch posts on filter change
  useEffect(() => {
    fetchPosts();
  }, [filter]);

  return (
    <div
      style={{
        backgroundColor: "#1E1E2F",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {loading && <Loader />} {/* Show loader when loading */}
      {/* Rest of the component */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 30px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 0 }}>+</span>
          Create Post
        </button>
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          &#x22EE; {/* Vertical Ellipsis Icon */}
        </button>
      </header>
      {/* Rest of your JSX */}
      {/* Modal for Creating a Post */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#2A2A3B",
              width: "400px",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              &#x2715; {/* Close "X" Icon */}
            </button>
            <h2 style={{ color: "#fff", textAlign: "center" }}>Create Post</h2>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              required
              onChange={handleInputChange}
              style={{
                backgroundColor: "#1E1E2F",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #6C63FF",
                fontSize: "1rem",
                color: "#fff",
              }}
            />
            <textarea
              name="description"
              required
              placeholder="Project Description"
              value={formData.description}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#1E1E2F",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #6C63FF",
                fontSize: "1rem",
                color: "#fff",
                resize: "none",
                height: "100px",
              }}
            />
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#1E1E2F",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #6C63FF",
                fontSize: "1rem",
                color: "#fff",
              }}
            >
              <option value="creative">Creative</option>
              <option value="website">Website</option>
              <option value="software">Software</option>
            </select>
            <input
              type="url"
              required
              name="url"
              placeholder="Project URL"
              value={formData.url}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#1E1E2F",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #6C63FF",
                fontSize: "1rem",
                color: "#fff",
              }}
            />
            <button
              onClick={handlePublish}
              style={{
                backgroundColor: "#6C63FF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "1rem",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Publish
            </button>
          </div>
        </div>
      )}
      {/* Sidebar */}
      {showSidebar && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100vh",
            backgroundColor: "#2A2A3B",
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setShowSidebar(false)}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &#x2715; {/* Close "X" Icon */}
          </button>
          <h3 style={{ color: "#fff", marginBottom: "20px" }}>Filter</h3>
          {["my post", "creative", "website", "software", "all"].map((item) => (
            <button
              key={item}
              onClick={() => handleFilterChange(item)}
              style={{
                background: "none",
                border: "none",
                color: filter === item ? "#6C63FF" : "#fff",
                fontSize: "1rem",
                padding: "10px",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                margin: "5px 0",
              }}
            >
              {item}
            </button>
          ))}
        </aside>
      )}
      {/* Post List Section */}
      <div style={{ padding: "20px" }}>
        {posts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              flexDirection: "row-reverse",
            }}
          >
            {posts.map((post, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#2A2A3B",
                  padding: "15px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  
                }}
              >
                <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                  {post.title}
                </h3>
                <p style={{ color: "#ccc", marginBottom: "15px" }}>
                  {post.desc}
                </p>
                <span
                  style={{
                    backgroundColor: "#6C63FF",
                    color: "#fff",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    marginBottom: "10px",
                    width: "80px",
                  }}
                >
                  {post.category}
                </span>
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "1rem",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >
                  Posted by:{" "}
                  <strong>
                    <code>{post.owners}</code>
                  </strong>
                </p>
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "1rem",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >
                  Url:{" "}
                  <strong>
                    <a href={post.url}>{post.url}</a>
                  </strong>
                </p>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6C63FF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "background-color 0.3s ease",
                    width: "150px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#5849c8")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#6C63FF")
                  }
                >
                  Join Chat
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#fff", textAlign: "center" }}>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
