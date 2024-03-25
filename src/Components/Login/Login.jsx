import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import './Login.css';
import Footer from '../Footer/Footer';

const Login = () => {
    const [register_number, setRegNum] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/data/input.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const students = data.student;
            const user = students.find(u => u.register_number === register_number && u.password === password);
            if (user) {
                history(`/UserInfo/${register_number}`);
            } else {
                alert('Invalid register number or password');
                setRegNum('');
                setPassword('');
            }
        } catch (err) {
            console.error('Error during login:', err);
        }
    }

    return (
        <>
            <div className='login-section'>
                <h1>Login</h1>
                <section className='login-field'>
                    <div className='username-field'>
                        <input
                            type="text"
                            id="register_number"
                            placeholder="REGISTER NUMBER"
                            value={register_number}
                            onChange={(e) => setRegNum(e.target.value)}
                        />
                    </div>

                    <div className='password-field'>
                        <input
                            type="password"
                            id="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handleLogin}>LOGIN</button>

                </section>
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
        </>
    );
};

export default Login;