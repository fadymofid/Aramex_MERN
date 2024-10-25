import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css"; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Updated Form Data:", { ...formData, [name]: value }); // Log updated data
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form Submitted:", formData); // Log form data on submission
    
    try {
      const response = await axios.post("http://localhost:8000/registers", formData);
      console.log("Registration successful:", response.data);
      // Handle success (e.g., show success message or redirect)
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}> {/* Ensure onSubmit is here */}
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn submit-btn"onClick={handleSubmit}> {/* Ensure button type is submit */}
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
