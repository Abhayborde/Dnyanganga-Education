import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AddTeacher from "../pages/Admin/AddTeacher";
import AddCounselor from "../pages/Admin/AddCounselor";
import VisitingForm from "../pages/Admin/VisitingForm";  // Import Visiting Form
import RegistrationForm from "../pages/Admin/RegistrationForm";  // Import Registration Form
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import CounselorDashboard from "../pages/Counselor/CounselorDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute element={<AdminDashboard />} roles={["admin"]} />}
      />
      <Route
        path="/admin/add-teacher"
        element={<ProtectedRoute element={<AddTeacher />} roles={["admin"]} />}
      />
      <Route
        path="/admin/add-counselor"
        element={<ProtectedRoute element={<AddCounselor />} roles={["admin"]} />}
      />
      <Route
        path="/admin/visiting-form"
        element={<ProtectedRoute element={<VisitingForm />} roles={["admin"]} />}
      />
      <Route
        path="/admin/registration-form"
        element={<ProtectedRoute element={<RegistrationForm />} roles={["admin"]} />}
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={<ProtectedRoute element={<TeacherDashboard />} roles={["teacher"]} />}
      />

      {/* Counselor Routes */}
      <Route
        path="/counselor/dashboard"
        element={<ProtectedRoute element={<CounselorDashboard />} roles={["counselor"]} />}
      />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

      {/* Fallback Route */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
