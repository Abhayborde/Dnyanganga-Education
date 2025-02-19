import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your backend API
  headers: {
    "Content-Type": "application/json", // Default header for JSON requests
  },
});

// Attach token to request headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers if available
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle any errors during the request
);

// Handle response errors globally (optional)
api.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error, you might redirect to login page
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Reject any other errors
  }
);

export default api; // Export the configured axios instance
