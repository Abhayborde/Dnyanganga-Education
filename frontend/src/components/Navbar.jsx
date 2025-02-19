import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
