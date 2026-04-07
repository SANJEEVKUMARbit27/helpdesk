import { useNavigate, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .nav-root {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
  }

  .nav-brand {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    letter-spacing: -0.3px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: opacity 0.2s;
    user-select: none;
  }
  .nav-brand:hover { opacity: 0.85; }
  .nav-brand-dot { color: #7c6fff; }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nav-btn {
    background: transparent;
    border: 1px solid transparent;
    color: #8a8aaa;
    padding: 6px 14px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .nav-btn:hover {
    background: rgba(255,255,255,0.07);
    color: #fff;
    border-color: rgba(255,255,255,0.1);
  }
  .nav-btn.active {
    background: rgba(124,111,255,0.12);
    color: #9d8fff;
    border-color: rgba(124,111,255,0.25);
  }

  .nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.08);
    margin: 0 6px;
  }

  .nav-welcome {
    font-size: 13px;
    color: #5a5a78;
    font-weight: 400;
    padding: 0 4px;
    white-space: nowrap;
  }
  .nav-welcome span {
    color: #9d8fff;
    font-weight: 500;
  }

  .nav-logout {
    background: rgba(240,91,91,0.1);
    border: 1px solid rgba(240,91,91,0.25);
    color: #f05b5b;
    padding: 6px 14px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .nav-logout:hover {
    background: rgba(240,91,91,0.2);
    border-color: rgba(240,91,91,0.4);
    color: #ff7070;
  }

  .nav-role-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    margin-right: 2px;
  }
  .role-student  { background: rgba(91,142,240,0.12); color: #5b8ef0; border: 1px solid rgba(91,142,240,0.2); }
  .role-staff    { background: rgba(240,168,75,0.12);  color: #f0a84b; border: 1px solid rgba(240,168,75,0.2); }
  .role-technician{ background: rgba(75,217,126,0.12); color: #4bd97e; border: 1px solid rgba(75,217,126,0.2); }
  .role-admin    { background: rgba(124,111,255,0.12); color: #7c6fff; border: 1px solid rgba(124,111,255,0.2); }
`;

const ROLE_ROUTES = {
  student: "/dashboard",
  staff: "/staff-dashboard",
  technician: "/technician-dashboard",
  admin: "/admin-dashboard",
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{styles}</style>
      <nav className="nav-root">

        {/* BRAND */}
        <div className="nav-brand" onClick={() => navigate(ROLE_ROUTES[role] || "/")}>
          Campus<span className="nav-brand-dot">·</span>Helpdesk
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          {/* STUDENT LINKS */}
          {role === "student" && (
            <>
              <button
                className={`nav-btn ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`nav-btn ${isActive("/raise-complaint") ? "active" : ""}`}
                onClick={() => navigate("/raise-complaint")}
              >
                Raise Complaint
              </button>
              {/* <button
                className={`nav-btn ${isActive("/my-complaints") ? "active" : ""}`}
                onClick={() => navigate("/my-complaints")}
              >
                My Complaints
              </button> */}
            </>
          )}

          {/* STAFF */}
          {role === "staff" && (
            <button
              className={`nav-btn ${isActive("/staff-dashboard") ? "active" : ""}`}
              onClick={() => navigate("/staff-dashboard")}
            >
              Dashboard
            </button>
          )}

          {/* TECHNICIAN */}
          {role === "technician" && (
            <button
              className={`nav-btn ${isActive("/technician-dashboard") ? "active" : ""}`}
              onClick={() => navigate("/technician-dashboard")}
            >
              Dashboard
            </button>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <button
              className={`nav-btn ${isActive("/admin-dashboard") ? "active" : ""}`}
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </button>
          )}

          <div className="nav-divider" />

          {/* ROLE BADGE */}
          {role && (
            <span className={`nav-role-badge role-${role}`}>{role}</span>
          )}

          {/* WELCOME */}
          {name && (
            <span className="nav-welcome">
              <span>{name}</span>
            </span>
          )}

          <div className="nav-divider" />

          {/* LOGOUT */}
          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
