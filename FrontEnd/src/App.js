import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CreateSoftware from "./Pages/CreateSoftware";
import RequestAccess from "./Pages/RequestAccess";
import PendingRequests from "./Pages/PendingRequests";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"; // Custom styles for layout

function App() {
  return (
    <>
      <Navbar />
      <main className="custom-main-wrapper py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 col-md-10">
              <div className="content-box rounded-4 shadow-lg p-4 bg-white">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/create-software"
                    element={
                      <ProtectedRoute role="Admin">
                        <CreateSoftware />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/request-access"
                    element={
                      <ProtectedRoute role="Employee">
                        <RequestAccess />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pending-requests"
                    element={
                      <ProtectedRoute role="Manager">
                        <PendingRequests />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
