import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { useState } from "react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation()
  const role = sessionStorage.getItem("role")
  const handlePage = () => {
  console.log("location : ",)
    if (location.pathname === "/profile") {
      navigate('/dashboard')
    }
    if (location.pathname === '/dashboard') {
      navigate('/profile')
    }
  }
  return (
    <AppBar position="sticky">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box p={2} display={"flex"} alignItems={"center"} gap={7}>
          <Typography variant="h4">LOGO</Typography>
        </Box>
        <Box display={"flex"} gap={3}>
          {role === 'admin' &&
          <Button variant='contained' size="large" onClick={handlePage}>
            {location.pathname !== '/profile' ? <AccountBoxOutlinedIcon /> :<SpaceDashboardOutlinedIcon/>}
          </Button>
          }
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => navigate("/")}
          >
            <LogoutIcon />
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
}
export default NavBar;
