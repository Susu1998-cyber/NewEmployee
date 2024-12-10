const express = require("express")
const router = express.Router();
const Department = require("../models/Department")

router.route('/').get((req,res) => {
    Department.find()
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route('/add').post((req,res) => {
    const {departmentid,departmentname,employedesignation,employesalary} = req.body

    const newDepartment = new Department({departmentid,departmentname,employedesignation,employesalary})

    newDepartment.save()
    .then((savedDepartment) => res.json(savedDepartment))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route('/update/:id').post((req,res) => {
    Department.findById(req.params.id)
    .then((department) => {
        if(!department) {
            return res.status(404).json("Department not found")
        }

        department.departmentid = req.body.departmentid
        department.departmentname = req.body.departmentname;
        department.employedesignation = req.body.employedesignation;
        department.employesalary = req.body.employesalary;


        department.save()
        .then(() => res.json("Department updated"))
        .catch((err) => res.status(400).json("Error: " + err))
    })

    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/delete/:id").delete((req,res) => {
    Department.findByIdAndDelete(req.params.id)
    .then(department => {
        if(!department) {
            return res.status(404).json('Department not found')
        }
        res.json("Department deleted")
    })

    .catch((err) => res.status(400).json("Error " + err))
})

module.exports = router