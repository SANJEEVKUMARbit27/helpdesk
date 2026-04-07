const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

/*
GET: /api/technician/assigned
Technician dashboard complaints
*/
router.get("/assigned", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "technician") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find({
      $or: [
        { department: req.user.department, status: "Pending" },
        { assignedTo: req.user.id }
      ]
    })
    .populate("userId", "name email");

    res.json(complaints);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;