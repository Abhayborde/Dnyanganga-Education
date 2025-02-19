import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from '../../services/api';
import './styles/TeacherDashboard.css';

const TeacherDashboard = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get('/teacher/history')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="teacher-dashboard">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="dashboard-content">
                    <h2>Teacher Dashboard</h2>
                    <h3>Recent Teacher History</h3>
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
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.action}</td>
                                    <td>{teacher.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
