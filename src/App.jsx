import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import PieVisualize from './Components/PieVisualize/PieVisualize';
import BarVisualize from './Components/BarVisualize/BarVisualize';
import Dashboard from './Components/Dashboard/Dashboard';
import Table from './Components/Table/Table';
import UserInfo from './Components/UserInfo/UserInfo';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Login" element={<Login />} />
        <Route path="PieVisualize" element={<PieVisualize />} />
        <Route path="BarVisualize" element={<BarVisualize />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Table" element={<Table />} />
        <Route path="UserInfo/:register_number" element={<UserInfo />} />
        <Route path="Footer" element={<Footer />} />
      </Routes>
    </>
  );
}

export default App;