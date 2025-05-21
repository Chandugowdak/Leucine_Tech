import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./RequestAccess.css";

function RequestAccess() {
  const [form, setForm] = useState({
    softwareId: "",
    accessType: "",
    reason: "",
  });
  const [softwares, setSoftwares] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const res = await API.get("/software/all");
        setSoftwares(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching software list:", err.response || err.message || err);
        setError(" Failed to load software list.");
      }
    };
    fetchSoftwares();
  }, []);

  const selectedSoftware = softwares.find((s) => s._id === form.softwareId);
  const accessLevels = Array.isArray(selectedSoftware?.accessLevels)
    ? selectedSoftware.accessLevels
    : [];

  const handleSoftwareChange = (e) => {
    setForm({ ...form, softwareId: e.target.value, accessType: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue.");
      return navigate("/login");
    }

    try {
      await API.post("/requests", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(" Request submitted successfully!");
      setForm({ softwareId: "", accessType: "", reason: "" });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || " Request failed.");
      if (err.response?.status === 401) navigate("/login");
    }
  };

  return (
    <div className="access-page">
      <div className="access-card">
        <h2 className="title">🔒 Request Software Access</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="access-form">
          <label>Select Software</label>
          <select value={form.softwareId} onChange={handleSoftwareChange} required>
            <option value="">-- Select --</option>
            {softwares.map((soft) => (
              <option key={soft._id} value={soft._id}>
                {soft.name}
              </option>
            ))}
          </select>

          <label>Access Type</label>
          <select
            value={form.accessType}
            onChange={(e) => setForm({ ...form, accessType: e.target.value })}
            disabled={!form.softwareId || accessLevels.length === 0}
            required
          >
            <option value="">-- Select --</option>
            {accessLevels.length > 0 ? (
              accessLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))
            ) : (
              <option disabled>No access levels available</option>
            )}
          </select>

          <label>Reason</label>
          <textarea
            rows="4"
            placeholder="Explain your reason for requesting access..."
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
          />

          <button type="submit" className="submit-btn" disabled={!form.accessType}>
            🚀 Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestAccess;
