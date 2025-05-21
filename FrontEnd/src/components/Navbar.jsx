import React from "react";
import { Link , useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  
const usenavigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    usenavigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Access<span className="pro">Pro</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto gap-2 align-items-lg-center">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/create-software">
              Create Software
            </Link>
            <Link className="nav-link" to="/request-access">
              Request Access
            </Link>
            <Link className="nav-link" to="/pending-requests">
              Pending Requests
            </Link>
            <button
              className="btn btn-danger  "
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
