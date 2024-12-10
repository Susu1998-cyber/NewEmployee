const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeSchema = new Schema({
  employeid: { type: String, required: true },
  employename: { type: String, required: true },
  employeaddress: { type: String, required: true },
  contactno: { type: String, required: true },
  employeemail: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeSchema);

module.exports = Employee;
