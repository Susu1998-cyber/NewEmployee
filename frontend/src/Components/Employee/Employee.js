import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeid: "",
    employename: "",
    employeaddress: "",
    contactno: "",
    employeemail: "",
  });
  const [editingId, setEditingId] = useState(null);

   const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee");
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

   const handleSubmit = async () => {
    try {
      if (editingId) {
         await axios.post(
          `http://localhost:8000/employee/update/${editingId}`,
          formData
        );
      } else {
         await axios.post("http://localhost:8000/employee/add", formData);
      }
      fetchEmployees();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employee/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

   const handleOpen = (employee = null) => {
    if (employee) {
      setFormData(employee);
      setEditingId(employee._id);
    } else {
      setFormData({
        employeid: "",
        employename: "",
        employeaddress: "",
        contactno: "",
        employeemail: "",
      });
      setEditingId(null);
    }
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

   const columns = [
    { field: "employeid", headerName: "Employee ID", width: 150 },
    { field: "employename", headerName: "Name", width: 150 },
    { field: "employeaddress", headerName: "Address", width: 200 },
    { field: "contactno", headerName: "Contact No.", width: 150 },
    { field: "employeemail", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpen(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h1>Employee Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        style={{ marginBottom: 20 }}
      >
        Add Employee
      </Button>
      <DataGrid rows={employees} columns={columns} getRowId={(row) => row._id} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Employee ID"
            fullWidth
            value={formData.employeid}
            onChange={(e) =>
              setFormData({ ...formData, employeid: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.employename}
            onChange={(e) =>
              setFormData({ ...formData, employename: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={formData.employeaddress}
            onChange={(e) =>
              setFormData({ ...formData, employeaddress: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Contact No."
            fullWidth
            value={formData.contactno}
            onChange={(e) =>
              setFormData({ ...formData, contactno: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={formData.employeemail}
            onChange={(e) =>
              setFormData({ ...formData, employeemail: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
