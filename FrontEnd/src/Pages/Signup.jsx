import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert(" Signup successful! Please login.");
      setForm({
        username: "",
        email: "",
        password: "",
        role: "Employee",
      });
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(" Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card animate-slideIn">
        <h2 className="text-center mb-4 text-gradient">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="👤 Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="signup-input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="text-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
