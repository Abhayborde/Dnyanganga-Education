import React, { useState } from 'react';
import axios from '../../services/api';
import '../Admin/styles/AddCounselor.css';  // Updated path
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const AddCounselor = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    qualification: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/counselor/add', formData);
      alert('Counselor added successfully!');
      console.log(response.data);
      setFormData({ email: '', password: '', address: '', qualification: '' });
    } catch (error) {
      console.error('Error adding counselor:', error.response?.data || error.message);
      alert('Failed to add counselor. Please try again.');
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="form-container">
          <h2>Add Counselor</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Counselor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCounselor;
