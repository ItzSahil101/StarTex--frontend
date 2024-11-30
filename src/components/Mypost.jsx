import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'; // Import a trash icon
import Loader from './Loader'; // Import your Loader component

function Yourpost() {
  const history = useNavigate();

  const [post, setPosts] = useState([]); // Ensure the initial state is an empty array
  const [loading, setLoading] = useState(false); // State to manage the loader
  const token = localStorage.getItem('auth');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Show loader while fetching
      try {
        const response = await axios.post(
          `https://star-tex-backend.vercel.app/api/yourpost`,
          { token }
        );

        const posts = response.data.posts; // Access posts from the correct key
        if (Array.isArray(posts)) {
          setPosts(posts);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };

    fetchPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    setLoading(true); // Show loader while deleting
    try {
      await axios.post(`https://star-tex-backend.vercel.app/api/yourpost/postDel`, { postId });
      // Update state instead of reloading the page
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setLoading(false); // Hide loader after deletion
    }
  };

  return (
    <>
      <button className='btn btn-primary' style={{
        margin: '25px', width: '60px'
      }} onClick={() => { history("/home") }}>Back</button>
      <div style={{ padding: "20px" }}>
        {/* Show loader if loading */}
        {loading && <Loader />}
        {/* Add a null check for post */}
        {!loading && post && post.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {post.map((post, index) => (
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
                <p style={{ color: "#ccc", marginBottom: "15px" }}>{post.desc}</p>
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
                  Posted by: <strong><code>{post.owners}</code></strong>
                </p>
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "1rem",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >
                  Url: <strong><a href={post.url}>{post.url}</a></strong>
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
                <div className="text-right pr-5">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(post._id)} // Use an arrow function to defer execution
                    title="Delete this post"
                    style={{ margin: '10px' }}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <p style={{ color: "#fff", textAlign: "center" }}>No posts found</p>
        )}
      </div>
    </>
  );
}

export default Yourpost;
