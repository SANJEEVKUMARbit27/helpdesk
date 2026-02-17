function RaiseComplaint() {
  return (
    <div className="container mt-4">
      <h2>Raise Complaint</h2>

      <div className="card p-4 shadow col-md-6">
        <form>
          <input className="form-control mb-3" type="text" placeholder="Title" required />

          <select className="form-control mb-3">
            <option>Select Department</option>
            <option>Electrical</option>
            <option>Hostel</option>
            <option>Library</option>
          </select>

          <textarea className="form-control mb-3" rows="4" placeholder="Describe your issue"></textarea>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RaiseComplaint;
