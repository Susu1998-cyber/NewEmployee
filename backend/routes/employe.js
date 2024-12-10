const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

 router.get("/", (req, res) => {
  Employee.find()
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json("Error: " + err));
});

 
  

 router.post("/add", (req, res) => {
  const { employeid, employename, employeaddress, contactno, employeemail } =
    req.body;

  const newEmploye = new Employee({
    employeid,
    employename,
    employeaddress,
    contactno,
    employeemail,
  });

  newEmploye
    .save()
    .then((savedEmployee) => res.json(savedEmployee))
    .catch((err) => res.status(400).json("Error: " + err));
});

 router.post("/update/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      employee.employeid = req.body.employeid;
      employee.employename = req.body.employename;
      employee.employeaddress = req.body.employeaddress;
      employee.contactno = req.body.contactno;

      employee.employeemail = req.body.employeemail;

      employee
        .save()
        .then(() => res.json("Employee Saved Successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

 router.delete("/delete/:id", (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
