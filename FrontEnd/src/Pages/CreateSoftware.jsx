import React, { useState } from "react";
import API from "../api";
import "./CreateSoftware.css";

function CreateSoftware() {
  const [software, setSoftware] = useState({
    name: "",
    description: "",
    accessLevels: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/software/software", {
        ...software,
        accessLevels: software.accessLevels.split(","),
      });
      alert("Software Created Successfully!");
      setSoftware({ name: "", description: "", accessLevels: "" });
    } catch {
      alert(" Error creating software");
    }
  };

  return (
    <div className="software-container">
      <div className="software-form-card">
        <h2 className="title"> Create Software</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Software Name"
            value={software.name}
            onChange={(e) => setSoftware({ ...software, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={software.description}
            rows={4}
            onChange={(e) =>
              setSoftware({ ...software, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Access Levels (comma separated)"
            value={software.accessLevels}
            onChange={(e) =>
              setSoftware({ ...software, accessLevels: e.target.value })
            }
            required
          />
          <button type="submit" className="animated-btn">
            Create ✨
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSoftware;
