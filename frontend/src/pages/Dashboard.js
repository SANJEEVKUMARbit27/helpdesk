function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>Total Complaints</h5>
            <h3>20</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>Pending</h5>
            <h3>8</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow text-center">
            <h5>Resolved</h5>
            <h3>12</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
