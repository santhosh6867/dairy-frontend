import React from "react";
import { Routes, Route } from "react-router-dom";

import Frontpage from "./Components/Frontpage";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
