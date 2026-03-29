import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import logo from "../../assets/logo.png"; 

function Profile() {
  const [open, setOpen] = useState(false);
  const navigate =useNavigate();
  return (
    <div className="profile-container">
      
      <div className="profile" onClick={() => setOpen(!open)}>
        <img src={logo} alt="profile" />
      </div>

     
      {open && (
        <div className="dropdown">
          <div className="dropdown-header">
            <img src={logo} alt="profile" />
            <div>
              <h4>admin</h4>
              <p>admin@metacore.com</p>
            </div>
          </div>

          <div className="dropdown-item"
           onClick={() => {
              navigate("/profiledetails");
              setOpen(false); 
            }}
          >Profile Details</div>
          <div className="dropdown-item">Security Settings</div>
          <hr/>
          <div className="dropdown-item"
           onClick={() => {
              navigate("/");
            }}
            >Logout</div>
        </div>
      )}
    </div>
  );
}

export default Profile;