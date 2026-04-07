const express = require("express");
const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
CREATE COMPLAINT (Student)
*/
router.post("/", authMiddleware, async (req, res) => {

  const { title, description, priority, department } = req.body;

  try {

    const complaint = await Complaint.create({
      title,
      description,
      priority,
      department,
      status: "Pending",
      userId: req.user.id
    });

    res.status(201).json(complaint);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

});


/*
GET MY COMPLAINTS (Student)
*/
router.get("/my", authMiddleware, async (req, res) => {

  const complaints = await Complaint.find({
    userId: req.user.id
  });

  res.json(complaints);

});


/*
GET ALL COMPLAINTS (Admin / Staff)
*/
router.get("/", authMiddleware, async (req, res) => {

  if (req.user.role !== "staff" && req.user.role !== "admin")
    return res.status(403).json({ message: "Access Denied" });

  const complaints = await Complaint.find()
    .populate("userId", "name email")
    .populate("assignedTo", "name email");

  res.json(complaints);

});


/*
UPDATE STATUS (Technician)
*/
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { status, remark } = req.body;

    const updateData = {
      status
    };

    // Assign technician when task starts
    if (status === "In Progress") {
      updateData.assignedTo = req.user.id;
    }

    // Save technician remark
    if (remark) {
      updateData.remark = remark;
    }

    // Save resolved time
    if (status === "Resolved") {
      updateData.resolvedAt = new Date();
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

});
/*
ASSIGN TECHNICIAN (Admin)
*/
router.put("/assign/:id", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "admin" && req.user.role !== "staff") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { technicianId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: technicianId,
        status: "In Progress"
      },
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }

});
// Student confirms if issue is resolved
router.put("/confirm/:id", authMiddleware, async (req, res) => {

  const { studentResolved, studentRemarks } = req.body;

  try {

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        studentResolved,
        studentRemarks
      },
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

});
module.exports = router;