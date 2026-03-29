import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/logo.png"; 

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
        <hr/>
      </div>
      <nav>
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/patients" className="nav-link">
          Patients
        </NavLink>
        <NavLink to="/tests" className="nav-link">
          Tests
        </NavLink>
        <NavLink to="/reports" className="nav-link">
          Reports
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;