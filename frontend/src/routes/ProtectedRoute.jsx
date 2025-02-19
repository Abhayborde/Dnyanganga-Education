import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, roles }) => {
  const token = localStorage.getItem("token"); // Check if user is authenticated
  const role = localStorage.getItem("role"); // Retrieve user's role

  if (!token || !role) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (roles.includes(role)) {
    // Render the component if the role is allowed
    return element;
  }

  // Redirect to unauthorized page if the role is not allowed
  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
