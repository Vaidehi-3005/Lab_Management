import React, { useState } from "react";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Profile from "../../Components/Profile/Profile";
import "./ProfileDetails.css";

function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    email: "admin@metacore.com",
    name: "admin",
    phone: "",
    role: ""
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // save changes
  const handleSave = () => {
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <>
     <div style={{ display: "flex" }}>
      <Sidebar />
      <Profile/>

      <div style={{ padding: "20px", width: "80%" }}>
    
    
    <div className="profile-card">

      <div className="card-header">
        <h2>Profile Information</h2>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input type="text" value={formData.email} disabled />
        <small>Email can be changed in Security Settings</small>
      </div>

      {/* Row */}
      <div className="row">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter your role"
          disabled={!isEditing}
        />
      </div>

    </div>
    </div>
    </div>
    </>
  );
}

export default ProfileDetails;