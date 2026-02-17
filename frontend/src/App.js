import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/raise" element={<><Navbar /><RaiseComplaint /></>} />
        <Route path="/complaints" element={<><Navbar /><MyComplaints /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/staff-dashboard" element={<><Navbar /><StaffDashboard /></>} />

      </Routes>
    </Router>
  );
}

export default App;
