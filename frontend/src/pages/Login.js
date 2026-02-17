import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.startsWith("stu")) {
      navigate("/dashboard");
    } 
    else if (username.startsWith("staff")) {
      navigate("/staff-dashboard");
    } 
    else {
      setError("Invalid Username! Use 'stu' or 'staff' prefix.");
    }
  };

  return (
    <div className="login-container">
      <div className="card p-4 shadow col-md-4">
        <h3 className="text-center mb-3">Campus Helpdesk Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username (stu123 / staff01)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
