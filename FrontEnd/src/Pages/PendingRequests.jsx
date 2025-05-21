import React, { useEffect, useState } from "react";
import API from "../api";
import "./PendingRequests.css";

function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then((res) => setRequests(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.patch(`/requests/${id}`, { status });
    setRequests((req) => req.filter((r) => r._id !== id));
  };

  return (
    <div className="container py-4">
      <h3 className="text-center text-primary mb-4">Pending Requests</h3>
      {requests.length === 0 ? (
        <p className="text-center text-muted">No pending requests</p>
      ) : (
        <div className="row g-4">
          {requests.map((r) => (
            <div className="col-md-6 col-lg-4" key={r._id}>
              <div className="card request-card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="badge bg-info text-dark">
                      {r.user.username}
                    </span>{" "}
                    requested{" "}
                    <span className="badge bg-warning text-dark">
                      {r.accessType}
                    </span>
                  </h5>
                  <p className="card-text">
                    Software:{" "}
                    <strong className="text-primary">{r.software.name}</strong>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateStatus(r._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(r._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingRequests;
