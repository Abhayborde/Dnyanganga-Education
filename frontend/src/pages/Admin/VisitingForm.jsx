import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./styles/Form.css";

const VisitingForm = () => {
  const [formData, setFormData] = useState({
    visitorName: "",
    purpose: "",
    date: "",
    time: "",
    phone: "",
    email: "",
    organization: "",
    idProof: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Visiting Data:", formData);
    alert("Visitor Registered Successfully!");
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="form-container">
          <h2>Visiting Form</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="visitorName" placeholder="Visitor Name" onChange={handleChange} required />
            <input type="text" name="purpose" placeholder="Purpose of Visit" onChange={handleChange} required />
            <input type="date" name="date" placeholder="Date" onChange={handleChange} required />
            <input type="time" name="time" placeholder="Time" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="organization" placeholder="Organization Name (if any)" onChange={handleChange} />
            <input type="text" name="idProof" placeholder="ID Proof (Aadhar/PAN/Voter ID)" onChange={handleChange} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitingForm;
