const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Complaint = require("../models/Complaint");


/* ================= TOTAL USERS ================= */

router.get("/users", async(req,res)=>{
try{

const users = await User.find({role:{$ne:"admin"}});
res.json(users);

}
catch(error){
res.status(500).json({message:"Error fetching users"});
}
});


/* ================= PENDING USERS ================= */

router.get("/pending-users", async(req,res)=>{
try{

const users = await User.find({
isApproved:false,
role:{$ne:"admin"}
});

res.json(users);

}
catch(error){
res.status(500).json({message:"Error fetching pending users"});
}
});


/* ================= APPROVE USER ================= */

router.put("/approve/:id", async(req,res)=>{

try{

await User.findByIdAndUpdate(req.params.id,{
isApproved:true
});

res.json({message:"User approved"});

}
catch(error){
res.status(500).json({message:"Approval failed"});
}

});


/* ================= REJECT USER ================= */

router.delete("/reject/:id", async(req,res)=>{

try{

await User.findByIdAndDelete(req.params.id);

res.json({message:"User rejected"});

}
catch(error){
res.status(500).json({message:"Reject failed"});
}

});



router.get("/complaints", async(req,res)=>{
try{

const complaints = await Complaint.find().populate("user","name");

res.json(complaints);

}
catch(error){
res.status(500).json({message:"Error fetching complaints"});
}
});
// CHANGE TECHNICIAN (ADMIN)
router.put("/change-technician/:id", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { technicianId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: technicianId,
        status: "In Progress"
      },
      { new: true }
    ).populate("assignedTo","name email");

    res.json(complaint);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;