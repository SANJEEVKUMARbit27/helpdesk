function Profile() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Profile</h2>

      <div className="card shadow p-4">
        <div className="row">

      
          <div className="col-md-4 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              width="150"
            />
            <h5>Sanjeevkumar S</h5>
            <p className="text-muted">Student</p>
          </div>

          
          <div className="col-md-8">
            
            <h5 className="mb-3">Personal Details</h5>
            <p><strong>Full Name:</strong> Sanjeevkumar S</p>
            <p><strong>Date of Birth:</strong> 17/06/2006</p>
            <p><strong>Gender:</strong> Male</p>

            <hr />

            <h5 className="mb-3">Academic Details</h5>
            <p><strong>Department:</strong> Mechatronics Engineering</p>
            <p><strong>Year:</strong> 3rd Year</p>
            <p><strong>Register Number:</strong> 7376231MZ144</p>

            <hr />

            <h5 className="mb-3">Contact Details</h5>
            <p><strong>Email:</strong> sanjeevkumar.mz23@bitsathy.ac.in</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Address:</strong> Tiruppur, Tamil Nadu</p>

            <div className="mt-4">
              <button className="btn btn-primary me-2">
                Request edit access 
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
