import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffDashboard() {

  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "staff") {
      navigate("/login");
      return;
    }

    fetchComplaints();

  }, [navigate]);

  const fetchComplaints = async () => {

    try {

      const response = await fetch("http://localhost:5000/api/complaints");

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {

        const pending = data.filter((c) => c.status === "Pending").length;
        const inProgress = data.filter((c) => c.status === "In Progress").length;
        const resolved = data.filter((c) => c.status === "Resolved").length;

        setCounts({ pending, inProgress, resolved });

      } else {

        setCounts({ pending: 0, inProgress: 0, resolved: 0 });

      }

    } catch (error) {

      console.error(error);
      setCounts({ pending: 0, inProgress: 0, resolved: 0 });

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Staff Dashboard</h2>

      <div className="row text-center">

        <div className="col-md-4 mb-3">
          <div className="card shadow p-4 bg-warning text-white">
            <h5>Pending</h5>
            <h3>{counts.pending}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-4 bg-info text-white">
            <h5>In Progress</h5>
            <h3>{counts.inProgress}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-4 bg-success text-white">
            <h5>Resolved</h5>
            <h3>{counts.resolved}</h3>
          </div>
        </div>

      </div>

      <div className="text-center mt-4">

        <button
        className="btn btn-primary px-4 me-3"
        onClick={() => navigate("/manage-complaints")}
        >
        Manage Complaints
        </button>

        <button
        className="btn btn-success px-4"
        onClick={() => navigate("/raise-complaint")}
        >
        Raise Complaint
        </button>

      </div>

    </div>

  );

}

export default StaffDashboard;