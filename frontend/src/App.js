import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StaffDashboard from "./pages/StaffDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";

function App() {
  return (
    <Router>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />

        {/* RAISE COMPLAINT */}
        <Route
          path="/raise-complaint"
          element={
            <>
              <Navbar />
              <RaiseComplaint />
            </>
          }
        />

        {/* MY COMPLAINTS */}
        <Route
          path="/my-complaints"
          element={
            <>
              <Navbar />
              <MyComplaints />
            </>
          }
        />

        {/* STAFF DASHBOARD */}
        <Route
          path="/staff-dashboard"
          element={
            <>
              <Navbar />
              <StaffDashboard />
            </>
          }
        />

        {/* TECHNICIAN DASHBOARD */}
        <Route
          path="/technician-dashboard"
          element={
            <>
              <Navbar />
              <TechnicianDashboard />
            </>
          }
        />

        {/* MANAGE COMPLAINTS */}
        <Route
          path="/manage-complaints"
          element={
            <>
              <Navbar />
              <ManageComplaints />
            </>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <>
              <Navbar />
              <AdminDashboard />
            </>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;