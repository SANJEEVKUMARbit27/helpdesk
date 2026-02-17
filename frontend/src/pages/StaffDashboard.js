function StaffDashboard() {
  return (
    <div className="container mt-4">
      <h2>Staff Dashboard</h2>

      <div className="card p-4 shadow mt-3">
        <h5>Manage Complaints</h5>
        <p>View, update and resolve student complaints.</p>

        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CH001</td>
              <td>Sanjeev</td>
              <td>Electrical</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>CH002</td>
              <td>Rahul</td>
              <td>Library</td>
              <td>Resolved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffDashboard;
