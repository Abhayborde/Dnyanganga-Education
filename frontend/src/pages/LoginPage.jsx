import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../services/api'; // Axios instance for API requests
import "../styles/style1.css"; // Import the updated CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is 'admin'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Send a POST request to the backend login API
      const response = await axios.post("/auth/login", { email, password, role });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user data in localStorage for session management
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role); // Save user role

        // Redirect based on the user role after successful login
        if (user.role === "admin") {
          navigate("/admin/dashboard"); // Update to correct route
        } else if (user.role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (user.role === "counselor") {
          navigate("/counselor/dashboard");
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
