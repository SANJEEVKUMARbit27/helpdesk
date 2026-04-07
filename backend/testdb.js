const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/campus_helpdesk")
.then(() => {
    console.log("MongoDB Connected");
    process.exit(0);
})
.catch((err) => console.error("DB Connection Error:", err));