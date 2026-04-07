import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Backend is not returning JSON (check server route)");
        return;
      }

      if (response.ok) {
        const role = (data.role || "").toLowerCase();

        // ✅ store user information
        localStorage.setItem("role", role);
        localStorage.setItem("name", data.name || "");
        localStorage.setItem("userId", data.userId);   // ⭐ IMPORTANT
        localStorage.setItem("token", "loggedin");     // simple auth check

        if (role === "admin") navigate("/admin-dashboard", { replace: true });
        else if (role === "technician") navigate("/technician-dashboard", { replace: true });
        else if (role === "staff") navigate("/staff-dashboard", { replace: true });
        else navigate("/dashboard", { replace: true });
      } else {
        setMessage(data.message || "Invalid login");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">

      <div className="login-card card shadow-lg p-4">

        <h3 className="text-center mb-4 fw-bold text-primary">
          Campus Helpdesk Login
        </h3>

        {message && (
          <div className="alert alert-warning text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3 login-input"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3 login-input"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="btn btn-success w-100 login-btn">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="fw-bold">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;