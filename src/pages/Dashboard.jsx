import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApiRoutes from "../utils/ApiRoutes";
import ApiService from "../services/ApiService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { tableCellClasses } from "@mui/material/TableCell";

import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    width: "300px",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [addValues, setAddValues] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    department: "",
    role: "",
    salary: "",
  });

  const getData = async () => {
    try {
      const res = await ApiService.get(ApiRoutes.GETALL.path, {
        authentication: ApiRoutes.GETALL.authentication,
      });
      const disableAdminData = res.data.filter(data =>data.role !== "admin")
      setData(disableAdminData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.Error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateData = async (id) => {
    try {
       await ApiService.put(`/${id}`, addValues, {
        authentication: ApiRoutes.UPDATEONE.authentication,
      });
      toast.success("update success");
    } catch (error) {
      toast.error(error.response.data.Error);
    } finally {
      setAddValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        age: "",
        department: "",
        salary: "",
      });
      setTimeout(() => {
        setAdd(false);
        setEdit(false);
        getData();
      }, 1000);
    }
  };

  const handleEdit = async (id) => {
    if (edit) {
      false;
    } else {
      setEdit(true);
    }
    const filterData = data.filter((data) => data.id === id);
    setAddValues({
      id: filterData[0].id,
      firstName: filterData[0].firstName,
      lastName: filterData[0].lastName,
      email: filterData[0].email,
      password: filterData[0].password,
      mobile: filterData[0].mobile,
      age: filterData[0].age,
      department: filterData[0].department,
      role: filterData[0].role,
      salary: filterData[0].salary,
    });
    // updateData(id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await ApiService.post(ApiRoutes.CREATE.path, addValues, {
        authentication: ApiRoutes.CREATE.authentication,
      });
      toast.success("create data success");
    } catch (error) {
      toast.error(error.response.data.Error);
    } finally {
      setAddValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        age: "",
        department: "",
        role: "",
        salary: "",
      });
      setTimeout(() => {
        setAdd(false);
        setEdit(false);
        getData();
      }, 1000);
    }
  };
  const deleteById = async (id) => {
    try {
      await ApiService.delete(`/${id}`, {
        authentication: ApiRoutes.DELETEONE.authentication,
      });
      toast.success("Delete success");
    } catch (error) {
      toast.error(error.response.data.Error);
    } finally {
      getData()
    }
  };

  return (
    <Container maxWidth sx={{ mt: 5 }}>
      {!add && !edit && (
        <Box sx={{ textAlign: "right", mb: 3 }}>
          <Button onClick={() => setAdd(true)}>
            <PersonAddAltIcon fontSize="large" />
          </Button>
        </Box>
      )}
      {(add || edit) && (
        <Container maxWidth={"sm"} className="shadow-sm py-2">
          <Box textAlign={"right"}>
            <Button
              onClick={() => {
                setAdd(false);
                setEdit(false);
              }}
            >
              <HighlightOffIcon color="error" className="cursor-pointer" />
            </Button>
          </Box>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                label="First Name"
                name="firstName"
                value={addValues.firstName}
                onChange={handleChange}
              />
              <TextField
                required
                label="Last Name"
                name="lastName"
                value={addValues.lastName}
                onChange={handleChange}
              />
              <TextField
                required
                label="Email"
                type="email"
                name="email"
                value={addValues.email}
                onChange={handleChange}
              />
              <TextField
                label="Number"
                type="text"
                name="mobile"
                value={addValues.mobile}
                onChange={handleChange}
              />
              <TextField
                required
                label="Age"
                name="age"
                type="text"
                value={addValues.age}
                onChange={handleChange}
              />
              <TextField
                required
                label="Department"
                name="department"
                type="text"
                value={addValues.department}
                onChange={handleChange}
              />
              <TextField
                required
                label="Salary"
                name="salary"
                type="text"
                value={addValues.salary}
                onChange={handleChange}
              />
              <TextField
                required
                label="Password"
                type="password"
                name="password"
                value={addValues.password}
                onChange={handleChange}
              />
              <FormControl sx={{ pl: 4, mr: 8 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Role
                </FormLabel>
                <RadioGroup
                  row
                  name="role"
                  value={addValues.role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{ textAlign: "center" }}
                onClick={add ? handleSubmit : () => updateData(addValues.id)}
              >
                {add ? "add" : "save"}
              </Button>
            </div>
          </Box>
        </Container>
      )}
      {!add && !edit && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Salary</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.firstName}</StyledTableCell>
                  <StyledTableCell>{row.lastName}</StyledTableCell>
                  <StyledTableCell>{row.age}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>
                  <StyledTableCell>{row.department}</StyledTableCell>
                  <StyledTableCell>{row.salary}</StyledTableCell>
                  <StyledTableCell sx={{ display: "flex", px: 0 }}>
                    <Button onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </Button>
                    <Button color="error" onClick={() => deleteById(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Dashboard;
