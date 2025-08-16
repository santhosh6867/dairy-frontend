import React from "react";
import { useNavigate } from "react-router-dom";
import "../Csscompound/Frontpage.css";

const Frontpage = () => {
  const navigate = useNavigate();

  return (
    <div className="frontpage-container">
      <img
        className="background-image"
        src="https://www.shutterstock.com/image-photo/milk-jug-pouring-into-glass-600nw-657561061.jpg"
        alt="Cow and Milk"
      />
      <div className="overlay-content">
        <h1>Welcome to Dairy Management</h1>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default Frontpage;
