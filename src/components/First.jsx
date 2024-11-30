import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const First = () => {

    const history = useNavigate();

  const backgroundImage =
    'https://th.bing.com/th/id/R.8554bab5a24f8b4cbfa5d7f39e408eb0?rik=orN5UuzjzvY3cQ&pid=ImgRaw&r=0';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      {/* Website Name */}
      <h1
        style={{
          color: 'gold',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
          marginBottom: '20px',
        }}
      >
        StarTex
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          textAlign: 'center',
          marginBottom: '30px',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
          maxWidth: '80%',
        }}
      >
        Find your Team Members and Grow your Startup Idea
      </p>

      {/* Join Button */}
      <button
        onClick={() => (  history('/signup') )}
        style={{
          backgroundColor: 'yellow',
          color: '#000',
          fontSize: '1.2rem',
          padding: '12px 25px',
          borderRadius: '25px',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)',
          boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Join StarTex
      </button>
    </div>
  );
};

export default First;
