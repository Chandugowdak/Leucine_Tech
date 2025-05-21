import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      alert(" Login successful!");

      const role = response.data.role;
      if (role === "Admin") navigate("/create-software");
      else if (role === "Manager") navigate("/pending-requests");
      else if (role === "Employee") navigate("/request-access");
      else navigate("/login");
    } catch (error) {
      console.error("Login Error:", error);
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card glass-card">
        <h2 className="text-center mb-4 text-gradient">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control input-styled"
              placeholder="e.g. example@mail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control input-styled"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-glow w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
