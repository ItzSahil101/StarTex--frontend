import React from "react";

const Loader = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
  };

  const loaderStyle = {
    display: "inline-block",
    position: "relative",
    width: "80px",
    height: "80px",
  };

  const loaderDivStyle = (delay) => ({
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: "64px",
    height: "64px",
    margin: "8px",
    border: "8px solid #3498db",
    borderRadius: "50%",
    animation: "loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
    borderColor: "#3498db transparent transparent transparent",
    animationDelay: delay,
  });

  const keyframesStyle = `
    @keyframes loader-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      {/* Inject CSS keyframes dynamically */}
      <style>{keyframesStyle}</style>
      <div style={loaderStyle}>
        <div style={loaderDivStyle("-0.45s")}></div>
        <div style={loaderDivStyle("-0.3s")}></div>
        <div style={loaderDivStyle("-0.15s")}></div>
        <div style={loaderDivStyle("0s")}></div>
      </div>
    </div>
  );
};

export default Loader;
