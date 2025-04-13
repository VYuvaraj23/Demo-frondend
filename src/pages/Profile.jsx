import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApiService from "../services/ApiService";
import ApiRoutes from "../utils/ApiRoutes";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  fontWeight: "bold",
  color: theme.palette.common.white,
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

function Profile() {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
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
  const id = sessionStorage.getItem("id");
  const role = sessionStorage.getItem("role");

  const handleEdit = async () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }

    
    setAddValues({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      mobile: data.mobile,
      age: data.age,
      department: data.department,
      role: data.role,
      salary: data.salary,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateData = async () => {
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
        role: "",
        salary: "",
      });
      setTimeout(() => {
        setEdit(false);
        getProfile()
      }, 1000);
    }
  };

  const getProfile = async () => {
    try {
      const res = await ApiService.get(`/${id}`, {
        authentication: ApiRoutes.GetOne.authentication,
      });
      const data = res.data[0];
      const { password, ...filterData } = data;

      setData(filterData);
    } catch (error) {
      toast.error(error.response.data.Error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      {edit && (
        <Container maxWidth={"sm"} className="shadow-sm py-2">
          <Box textAlign={"right"}>
            <Button
              onClick={() => {
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
                  onChange={role ===  "admin"? handleChange : undefined}

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
                onClick={() => updateData()}
              >
                save
              </Button>
            </div>
          </Box>
        </Container>
      )}
     {!edit && <div className="flex flex-col items-center p-3 m-10 relative">
        <section className="w-1/3 ">
          {data.firstName && data.lastName && (
            <p className="w-28 h-28 rounded-full flex items-center justify-center text-5xl text-white bg-gray-400 text-center p-5">
              {data.firstName[0]} {data.lastName[0]}
            </p>
          )}
        </section>
        <Button
          variant="contained"
          color="info"
          className="absolute -right-52 bottom-10"
          onClick={handleEdit}
        >
          <EditIcon />
        </Button>
        <section className="">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {Object.entries(data).map(([label, value]) => (
                  <TableRow key={label}>
                    <StyledTableCell>{label}</StyledTableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>}
    </>
  );
}

export default Profile;
