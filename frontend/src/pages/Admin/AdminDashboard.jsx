import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        
      </div>
    </div>
  );
};

export default AdminDashboard;
