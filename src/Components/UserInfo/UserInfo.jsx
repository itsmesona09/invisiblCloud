import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import './UserInfo.css';
import Footer from '../Footer/Footer';

const UserInfo = () => {
    const { register_number } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/data/input.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const user = data.student.find(u => u.register_number === register_number);
                if (user) {
                    setUserInfo(user);
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [register_number]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userInfo) {
        return <div>User not found.</div>;
    }

    return (
        <div>
            <h1>User Information</h1>
            <ul className='UserInfo'>
                <li>Register Number - {userInfo.register_number}</li>
                <li>Semester - {userInfo.semester}</li>
                <li>CGPA - {userInfo.cgpa}</li>
                <li>High Scored Subject - {userInfo.high_scored_subject}</li>
                <li>Grade - {userInfo.grade}</li>
                <li>Batch - {userInfo.batch}</li>
                <li>Course - {userInfo.course}</li>
            </ul>
            <div className="action-icons">
                <Link to="/">
                    <FaHome className="home-icon" />
                </Link>
                <Link to="/Login">
                    <FaUser className="user-icon" />
                </Link>
                <Link to="/Dashboard">
                    <FaSignOutAlt className="logout-icon" />
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default UserInfo;