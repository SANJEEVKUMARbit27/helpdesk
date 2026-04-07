const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// ================= MongoDB Connection =================
mongoose
  .connect("mongodb://127.0.0.1:27017/campus_helpdesk")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));


// ================= Import Models =================
const User = require("./models/User");
const Complaint = require("./models/Complaint");


// ================= Test Route =================
app.get("/", (req, res) => {
  res.send("Campus Helpdesk Server Running");
});


// ================= LOGIN =================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    if (user.role !== "admin" && user.approved === false)
      return res.status(403).json({ message: "Wait for admin approval" });

    res.json({ role: user.role, name: user.name, userId: user._id });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REGISTER =================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      name,
      email,
      password,
      role,
      approved: role === "admin" ? true : false,
    });

    await newUser.save();
    res.json({ message: "Registration successful. Wait for admin approval." });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ADMIN USER APIs =================

// Approved Users
app.get("/api/admin/users", async (req, res) => {
  const users = await User.find({ approved: true });
  res.json(users);
});

// Pending Users
app.get("/api/admin/pending-users", async (req, res) => {
  const users = await User.find({ approved: false });
  res.json(users);
});

// Approve User
app.put("/api/admin/approve-user/:id", async (req, res) => {
  const { department } = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    approved: true,
    department: department || null,
  });
  res.json({ message: "User Approved & Department Assigned" });
});

// Reject User
app.delete("/api/admin/reject-user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Rejected" });
});

// Update Technician Department
app.put("/api/admin/update-department/:id", async (req, res) => {
  try {
    const { department } = req.body;
    await User.findByIdAndUpdate(req.params.id, { department });
    res.json({ message: "Department Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= ADMIN COMPLAINT APIs =================

// All Complaints
app.get("/api/admin/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("assignedTo", "name email role")
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({ ...c._doc, token: c.token || c._id }));
    res.json(formatted);

  } catch (error) {
    console.error("Admin Complaint Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Resolved Complaints
app.get("/api/admin/resolved-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: { $regex: /^resolved$/i } })
      .populate("assignedTo", "name email role")
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({ ...c._doc, token: c.token || c._id }));
    res.json(formatted);

  } catch (error) {
    console.error("Resolved Complaint Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= ASSIGN COMPLAINT DEPT & PRIORITY (for "Other" complaints) =================
// Admin assigns department and/or priority to complaints that had none set by the student.
// After assigning department, the system also tries to auto-assign an available technician.
app.put("/api/admin/assign-complaint/:id", async (req, res) => {
  try {
    const { department, priority } = req.body;

    const updateData = {};
    if (department) updateData.department = department;
    if (priority)   updateData.priority   = priority;

    // If a department is being assigned and complaint has no technician yet,
    // try to auto-assign the first available technician in that department.
    if (department) {
      const complaint = await Complaint.findById(req.params.id);

      if (!complaint.assignedTo) {
        const technicians = await User.find({
          role: "technician",
          department,
          approved: true,
        });

        for (let tech of technicians) {
          const activeTask = await Complaint.findOne({
            assignedTo: tech._id,
            status: "In Progress",
          });

          if (!activeTask) {
            updateData.assignedTo = tech._id;
            updateData.status     = "In Progress";
            break;
          }
        }
      }
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("assignedTo", "name email role")
      .populate("userId", "name email role");

    res.json({ message: "Complaint updated", complaint: updated });

  } catch (error) {
    console.error("Assign Complaint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= CHANGE TECHNICIAN =================
// Admin manually reassigns a complaint to a different technician.
app.put("/api/admin/change-technician/:complaintId", async (req, res) => {
  try {
    const { technicianId } = req.body;

    if (!technicianId)
      return res.status(400).json({ message: "technicianId is required" });

    const updated = await Complaint.findByIdAndUpdate(
      req.params.complaintId,
      { assignedTo: technicianId, status: "In Progress" },
      { new: true }
    )
      .populate("assignedTo", "name email role")
      .populate("userId", "name email role");

    if (!updated)
      return res.status(404).json({ message: "Complaint not found" });

    res.json({ message: "Technician changed", complaint: updated });

  } catch (error) {
    console.error("Change Technician Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= CREATE COMPLAINT =================
app.post("/api/complaints", async (req, res) => {
  try {
    const { title, description, priority, userId, department } = req.body;

    const count = await Complaint.countDocuments();
    const year  = new Date().getFullYear();
    const token = `CMP-${year}-${String(count + 1).padStart(3, "0")}`;

    let assignedTech = null;
    let status       = "Pending";

    // Only try auto-assign if department is provided (not an "Other" complaint)
    if (department) {
      const technicians = await User.find({
        role: "technician",
        department,
        approved: true,
      });

      for (let tech of technicians) {
        const activeTask = await Complaint.findOne({
          assignedTo: tech._id,
          status: "In Progress",
        });

        if (!activeTask) {
          assignedTech = tech;
          status       = "In Progress";
          break;
        }
      }
    }

    const complaint = new Complaint({
      token,
      userId,
      title,
      description,
      priority:   priority   || null,
      department: department || null,
      status,
      assignedTo: assignedTech ? assignedTech._id : null,
    });

    await complaint.save();

    res.json({ message: "Complaint submitted successfully", complaint });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET MY COMPLAINTS =================
app.get("/api/complaints/my/:userId", async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId })
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({ ...c._doc, token: c.token || c._id }));
    res.json(formatted);

  } catch (error) {
    console.error("Fetch Complaint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= STAFF VIEW COMPLAINTS =================
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({ ...c._doc, token: c.token || c._id }));
    res.json(formatted);

  } catch (error) {
    console.error("Fetch All Complaints Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= TECHNICIAN COMPLAINTS =================
app.get("/api/technician/complaints/:technicianId", async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedTo: req.params.technicianId })
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    const formatted = complaints.map(c => ({ ...c._doc, token: c.token || c._id }));
    res.json(formatted);

  } catch (error) {
    console.error("Technician Complaint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= UPDATE COMPLAINT STATUS =================
app.put("/api/complaints/:id", async (req, res) => {
  try {
    const { status, remark } = req.body;

    let updateData = { status };
    if (status === "Resolved") {
      updateData.resolvedAt = new Date();
      updateData.remark     = remark;
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // Auto-assign next pending complaint in same department when one is resolved
    if (status === "Resolved" && complaint.assignedTo && complaint.department) {
      const nextComplaint = await Complaint.findOne({
        status:     "Pending",
        department: complaint.department,
      }).sort({ createdAt: 1 });

      if (nextComplaint) {
        nextComplaint.assignedTo = complaint.assignedTo;
        nextComplaint.status     = "In Progress";
        await nextComplaint.save();
      }
    }

    res.json({ message: "Status updated", complaint });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET TECHNICIANS BY DEPARTMENT =================
app.get("/api/admin/technicians/:department", async (req, res) => {
  try {
    const technicians = await User.find({
      role:       "technician",
      department: req.params.department,
      approved:   true,
    });
    res.json(technicians);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
