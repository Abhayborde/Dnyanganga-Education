import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/history`);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Qualification</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.role}</td>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.password}</td>
              <td>{entry.address}</td>
              <td>{entry.qualification}</td>
              <td>{entry.action}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
