const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  departmentid: { type: String, required: true },
  departmentname: { type: String, required: true },
  employedesignation: { type: String, required: true },
  employesalary: { type: String, required: true },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
