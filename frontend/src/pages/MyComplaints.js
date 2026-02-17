function MyComplaints() {
  return (
    <div className="container mt-4">
      <h2>My Complaints</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CH001</td>
            <td>Electrical</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>CH002</td>
            <td>Library</td>
            <td>Resolved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyComplaints;
