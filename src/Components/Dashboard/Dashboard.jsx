import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import './Dashboard.css';
import Footer from '../Footer/Footer';

const Dashboard = () => {
  return (
    <div>
      <h1>PROGRESS PULSE</h1>
      <h1>Dashboard</h1>
      <div className='Dashboard'>
        <Link to="/PieVisualize">
          <button>VISUALIZATION (Pie Chart)</button>
        </Link>
        <Link to="/BarVisualize">
          <button>VISUALIZATION (Bar Chart)</button>
        </Link>
        <Link to="/Table">
          <button>FILTRATION</button>
        </Link>
      </div>
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

export default Dashboard;