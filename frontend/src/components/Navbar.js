import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Campus Helpdesk
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          <Link className="nav-link text-white" to="/raise">Raise</Link>
          <Link className="nav-link text-white" to="/complaints">My Complaints</Link>
          <Link className="nav-link text-white" to="/profile">Profile</Link>
          <Link className="nav-link text-white" to="/about">About</Link>
          <Link className="nav-link text-white" to="/contact">Contact</Link>
          <Link className="nav-link text-danger" to="/">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
