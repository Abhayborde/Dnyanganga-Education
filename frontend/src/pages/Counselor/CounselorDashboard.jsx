import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from '../../services/api';
import './styles/CounselorDashboard.css';

const CounselorDashboard = () => {
    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        axios.get('/counselor/history')
            .then(response => {
                setCounselors(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="counselor-dashboard">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="dashboard-content">
                    <h2>Counselor Dashboard</h2>
                    <h3>Recent Counselor History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {counselors.map((counselor) => (
                                <tr key={counselor.id}>
                                    <td>{counselor.name}</td>
                                    <td>{counselor.email}</td>
                                    <td>{counselor.action}</td>
                                    <td>{counselor.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CounselorDashboard;
