const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: String,
  email: String,
  password: String,

  role: {
    type: String
  },

  approved: {
    type: Boolean,
    default: false
  },

  // ⭐ ADD THIS
  department: {
    type: String,
    default: null
  }

});

module.exports = mongoose.model("User", UserSchema);