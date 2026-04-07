import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Wait for admin approval.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">

      <div className="register-card card shadow-lg p-4">

        <h2 className="text-center mb-4 fw-bold text-primary">
          Campus Helpdesk Registration
        </h2>

        {message && (
          <div className="alert alert-info text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control register-input"
              name="name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control register-input"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control register-input"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-select register-input"
              name="role"
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="technician">Technician</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 register-btn">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;