// src/Components/layout/Header.jsx
import React, { useEffect } from "react";
import './Header.css';
import { NavLink, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import stationIcon from "../../assets/icons8-city-railway-station-80.png";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='app-header'>
      <div className="header-content">
        <div className="logo-name">
<div className="header-logo">
          <img src={stationIcon} alt="Railway station" />
        </div>
        <h1>Railway Reservation System</h1>
        </div>
        
        <nav className='nav-links'>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `nav-button ${isActive ? 'active' : ''}`
            }>
            Register
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
export default Header;