import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Csscompound/Signup.css";

const API_URL = process.env.REACT_APP_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        account_no: accountNo,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Account Number" value={accountNo} onChange={e => setAccountNo(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Signup;
