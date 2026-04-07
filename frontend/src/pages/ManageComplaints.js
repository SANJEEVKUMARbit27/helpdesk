import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageComplaints() {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

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
        setComplaints(data);
      }

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="container mt-4">

      <h2>Manage Complaints</h2>

      <table className="table table-bordered mt-3">

        <thead className="table-dark">

          <tr>
            <th>Task ID</th>
            <th>Student Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {complaints.map((c) => (

            <tr key={c._id}>

              <td>{c.token}</td>

              <td>{c.userId?.name}</td>

              <td>{c.title}</td>

              <td>{c.description}</td>

              <td>{c.priority}</td>

              <td>{c.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageComplaints;