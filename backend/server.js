 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const employeeRouter = require("./routes/employe.js");
const departmentRouter = require("./routes/department");

const app = express();
const PORT = process.env.PORT || 8000;
const mongoDBURL = "mongodb://127.0.0.1:27017/employecrud";

 const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);  
  }
};

 connectDB();

 
app.use(cors());
app.use(express.json()); 

 app.use("/employe", employeeRouter);
app.use("/department", departmentRouter);

 app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

 app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
