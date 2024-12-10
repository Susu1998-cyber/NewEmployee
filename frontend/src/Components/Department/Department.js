import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    departmentid: "",
    departmentname: "",
    employedesignation: "",
    employesalary: "",
  });

  const API_URL = "http://localhost:8000/department";

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(API_URL);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle Dialog Open/Close
  const handleOpen = (department = null) => {
    if (department) {
      setCurrentDepartment(department);
      setEditMode(true);
    } else {
      setCurrentDepartment({
        departmentid: "",
        departmentname: "",
        employedesignation: "",
        employesalary: "",
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

   const handleSubmit = async () => {
    try {
      if (editMode) {
         await axios.post(`${API_URL}/update/${currentDepartment._id}`, currentDepartment);
      } else {
         await axios.post(`${API_URL}/add`, currentDepartment);
      }
      fetchDepartments();
      handleClose();
    } catch (error) {
      console.error("Error saving department:", error.message);
    }
  };

   const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error.message);
    }
  };

  return (
    <div>
      <h1>Department Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Department
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department._id}>
                <TableCell>{department.departmentid}</TableCell>
                <TableCell>{department.departmentname}</TableCell>
                <TableCell>{department.employedesignation}</TableCell>
                <TableCell>{department.employesalary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(department)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(department._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Department" : "Add Department"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Department ID"
            fullWidth
            margin="dense"
            value={currentDepartment.departmentid}
            onChange={(e) =>
              setCurrentDepartment({ ...currentDepartment, departmentid: e.target.value })
            }
          />
          <TextField
            label="Department Name"
            fullWidth
            margin="dense"
            value={currentDepartment.departmentname}
            onChange={(e) =>
              setCurrentDepartment({ ...currentDepartment, departmentname: e.target.value })
            }
          />
          <TextField
            label="Employee Designation"
            fullWidth
            margin="dense"
            value={currentDepartment.employedesignation}
            onChange={(e) =>
              setCurrentDepartment({ ...currentDepartment, employedesignation: e.target.value })
            }
          />
          <TextField
            label="Employee Salary"
            fullWidth
            margin="dense"
            value={currentDepartment.employesalary}
            onChange={(e) =>
              setCurrentDepartment({ ...currentDepartment, employesalary: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepartmentTable;
