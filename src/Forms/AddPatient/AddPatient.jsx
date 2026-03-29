import React, { useState } from "react";
import "./AddPatient.css";

function AddPatient() {
  const generatePatientCode = () => {
   return "P" + new Date().getTime().toString().slice(-4);
  };

  const getEmptyForm = () => ({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    referredBy: "",
    patientCode: generatePatientCode(),
  });

  const [formData, setFormData] = useState(getEmptyForm());
  const [errors, setErrors] = useState({});

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.age) newErrors.age = "Age is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.contact) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter valid 10 digit number";
    }

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    return newErrors;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const existingPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    const updatedPatients = [...existingPatients, formData];

    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    alert("Patient added successfully!");

    // reset form properly
    setFormData(getEmptyForm());
    setErrors({});
  };

  // clear form (always works)
  const handleClear = () => {
    setFormData(getEmptyForm());
    setErrors({});
  };

  return (
    <div className="add-patient-container">
      <h2>Add New Patient</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <p className="error">{errors.fullName}</p>
          </div>

          <div>
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <p className="error">{errors.age}</p>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <p className="error">{errors.gender}</p>
          </div>

          <div>
            <label>Contact Number *</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter 10 digit number"
            />
            <p className="error">{errors.contact}</p>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <p className="error">{errors.address}</p>
          </div>
        </div>

        <div className="row">
          <div>
            <label>Referred By</label>
            <select
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
            >
              <option value="">Select Doctor</option>
              <option>Dr. Sharma</option>
              <option>Dr. Patil</option>
            </select>
          </div>

          <div>
            <label>Patient Code</label>
            <input type="text" value={formData.patientCode} readOnly />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="add-btn">
            Add Patient
          </button>
          <button type="button" onClick={handleClear}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPatient;