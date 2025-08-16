import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Csscompound/Login.css";
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [accountNo, setAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`, {
        account_no: accountNo,
        password
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("accountNo", response.data.user.account_no);
        navigate("/dashboard");
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Account Number" value={accountNo} onChange={e => setAccountNo(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
