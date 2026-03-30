import React, { useEffect, useState } from "react";
import "./PatientList.css";
import { useNavigate } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editCode, setEditCode] = useState(null); 
  const [editData, setEditData] = useState({});
  const navigate =useNavigate();

useEffect(() => {
  const loadPatients = () => {
    try {
      const stored = localStorage.getItem("patients");

      if (!stored) {
        setPatients([]);
        return;
      }

      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        const validData = parsed.filter(
          (p) => p && typeof p === "object" && p.patientCode
        );
        setPatients(validData);
      } else {
        console.warn("Invalid data format in localStorage");
        setPatients([]);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      localStorage.removeItem("patients");
      setPatients([]);
    }
  };

  loadPatients();
}, []);

  const handleDelete = (code) => {
    const updated = patients.filter((p) => p.patientCode !== code);
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  const handleEdit = (patient) => {
    setEditCode(patient.patientCode);
    setEditData({ ...patient });
  };

  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const handleSave = () => {
    const updated = patients.map((p) =>
      p.patientCode === editCode ? editData : p
    );

    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    setEditCode(null);
  };

  const handleCancel = () => {
    setEditCode(null);
  };

  const filteredPatients = patients.filter((p) =>
    Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())
  );
   const handleAddTest = (patient) => {
    navigate("/tests", { state: patient });
  };

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>

      <input
        type="text"
        placeholder="Search patient..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
            <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Referred By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => {
              const isEditing = editCode === p.patientCode;

              return (
                    <tr key={p.patientCode}>
            
            {/* CODE FIRST */}
            <td>{p.patientCode}</td>

            <td>
              {isEditing ? (
                <input
                  value={editData.fullName}
                  onChange={(e) => handleChange(e, "fullName")}
                />
              ) : (
                p.fullName
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.age}
                  onChange={(e) => handleChange(e, "age")}
                />
              ) : (
                p.age
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.gender}
                  onChange={(e) => handleChange(e, "gender")}
                />
              ) : (
                p.gender
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.contact}
                  onChange={(e) => handleChange(e, "contact")}
                />
              ) : (
                p.contact
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              ) : (
                p.email || "-"
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.address}
                  onChange={(e) => handleChange(e, "address")}
                />
              ) : (
                p.address
              )}
            </td>

            <td>
              {isEditing ? (
                <input
                  value={editData.referredBy}
                  onChange={(e) => handleChange(e, "referredBy")}
                />
              ) : (
                p.referredBy || "-"
              )}
            </td>

            <td className="actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.patientCode)}>
                    Delete
                  </button>
                  <button onClick={() => handleAddTest(p)}>+</button>
                </>
              )}
            </td>
          </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;