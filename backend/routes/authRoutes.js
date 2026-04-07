const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const user = new User({
      name,
      email,
      password,
      role,
      status: "pending"
    });

    await user.save();

    res.json({ message: "Registered Successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    if (user.status !== "approved") {
      return res.json({ message: "Wait for admin approval" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get all users
router.get("/users", async (req, res) => {

  const users = await User.find();
  res.json(users);

});


// Pending users
router.get("/pending", async (req, res) => {

  const users = await User.find({ status: "pending" });
  res.json(users);

});


// Approve user
router.put("/approve/:id", async (req, res) => {

  await User.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });

  res.json({ message: "User approved" });

});


// Reject user
router.put("/reject/:id", async (req, res) => {

  await User.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });

  res.json({ message: "User rejected" });

});

module.exports = router;