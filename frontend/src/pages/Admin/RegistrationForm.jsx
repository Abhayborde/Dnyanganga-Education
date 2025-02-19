import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./styles/Form.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aadharNumber: "",
    phone: "",
    email: "",
    address: "",
    school: "",
    marks: "",
    guardianName: "",
    guardianPhone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="form-container">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="text" name="aadharNumber" placeholder="Aadhar Number" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="school" placeholder="School Name" onChange={handleChange} required />
            <input type="text" name="marks" placeholder="Marks Obtained" onChange={handleChange} required />
            <input type="text" name="guardianName" placeholder="Guardian Name" onChange={handleChange} required />
            <input type="text" name="guardianPhone" placeholder="Guardian Phone" onChange={handleChange} required />
            <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
