import React, { useState } from "react";
import Sidebar from "../../Layouts/Sidebar/Sidebar";
import Profile from "../../Components/Profile/Profile";
import AddPatient from "../../Forms/AddPatient/AddPatient";
import PatientList from "../../Lists/PatientList/PatientList";
import './Patient.css'

function Patients() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div style={{ display: "flex" }}>
  <Sidebar />
  <Profile />

  <div className="content">
    
    <div className="tab-buttons">
      <button
        className={activeTab === "add" ? "active" : ""}
        onClick={() => setActiveTab("add")}
      >
        Add Patient
      </button>

      <button
        className={activeTab === "list" ? "active" : ""}
        onClick={() => setActiveTab("list")}
      >
        Patient List
      </button>
    </div>

    <div className="tab-content">
      {activeTab === "add" && <AddPatient />}
      {activeTab === "list" && <PatientList />}
    </div>

  </div>
</div>
  );
}

export default Patients;