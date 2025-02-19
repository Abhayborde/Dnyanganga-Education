import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
  const [isCounselorDropdownOpen, setCounselorDropdownOpen] = useState(false);
  const [isFormDropdownOpen, setFormDropdownOpen] = useState(false);
  const role = localStorage.getItem("role");

  return (
    <>
      {/* Sidebar Toggle Button (Only visible on mobile) */}
      <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <nav>
          {role === "admin" && (
            <>
              <Link to="/admin/dashboard">Admin Dashboard</Link>

              {/* Teacher Dropdown */}
              <div className="dropdown">
                <button className="dropdown-btn" onClick={() => setTeacherDropdownOpen(!isTeacherDropdownOpen)}>
                  Teacher {isTeacherDropdownOpen ? "▲" : "▼"}
                </button>
                {isTeacherDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/admin/add-teacher">Add Teacher</Link>
                    <Link to="/admin/teacher-history">Teacher History</Link>
                  </div>
                )}
              </div>

              {/* Counselor Dropdown */}
              <div className="dropdown">
                <button className="dropdown-btn" onClick={() => setCounselorDropdownOpen(!isCounselorDropdownOpen)}>
                  Counselor {isCounselorDropdownOpen ? "▲" : "▼"}
                </button>
                {isCounselorDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/admin/add-counselor">Add Counselor</Link>
                    <Link to="/admin/counselor-history">Counselor History</Link>
                  </div>
                )}
              </div>

              {/* Forms Dropdown */}
              <div className="dropdown">
                <button className="dropdown-btn" onClick={() => setFormDropdownOpen(!isFormDropdownOpen)}>
                  Forms {isFormDropdownOpen ? "▲" : "▼"}
                </button>
                {isFormDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/admin/visiting-form">Visiting Form</Link>
                    <Link to="/admin/registration-form">Registration Form</Link>
                  </div>
                )}
              </div>
            </>
          )}

          {role === "teacher" && <Link to="/teacher/dashboard">Teacher Dashboard</Link>}
          {role === "counselor" && <Link to="/counselor/dashboard">Counselor Dashboard</Link>}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
