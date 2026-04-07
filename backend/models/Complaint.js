const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({

  token: {
    type: String
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: {
    type: String
  },

  description: {
    type: String
  },

  department: {
    type: String
  },

  priority: {
    type: String
  },

  status: {
    type: String,
    default: "Pending"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Technician remark
  remark: {
    type: String,
    default: ""
  },

  // Student confirmation (after resolution)
  studentResolved: {
    type: String,
    enum: ["Yes", "No"],   // only Yes or No allowed
    default: null
  },

  // Student feedback
  studentRemark: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  resolvedAt: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model("Complaint", ComplaintSchema);