import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // ✅ added

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/my/${userId}`, // ✅ fixed
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints(data);
      } else {
        alert("Failed to fetch complaints");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Complaints</h2>

      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{index + 1}</td>
                  <td>{complaint.title}</td>
                  <td>{complaint.priority}</td>
                  <td>
                    <span
                      className={`badge ${
                        complaint.status === "Pending"
                          ? "bg-warning text-dark"
                          : complaint.status === "In Progress"
                          ? "bg-info"
                          : "bg-success"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    {new Date(complaint.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyComplaints;