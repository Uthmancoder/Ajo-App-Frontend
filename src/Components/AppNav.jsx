import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import FetchUserByToken from "./FetchUserByToken";
import AllUsers from "../Redux/AllUsers";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IoIosNotifications } from "react-icons/io";
import { BsBookHalf } from "react-icons/bs";

const AppNav = () => {
  const pages = ["Products", "Pricing", "Blog"];
  const smallpages = [
    "Dashboard",
    "Groups",
    "Account",
    "Messages",
    "Settings",
    "Logout",
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { fetchedUser } = useSelector((state) => state.AllUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("token");
  useEffect(() => {
    if (!userToken) {
      navigate("/signup");
      alert("User not found, try signing up for a new account");
    } else {
      FetchUserByToken(userToken, dispatch);
    }
  }, [dispatch]);

  // ...
  // navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  ;
  
  return (
    <div>
      <AppBar position="sticky" className="bg-primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div className="d-flex align-items-center ">
                <img
                  className="dashboard_logo img-fluid rounded-2"
                  src={require("../images/Microfinance.png")}
                  alt=""
                />
              </div>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {smallpages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component="a"
                      href={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <h5 className="fs-4">
                {" "}
                <span className="text-danger fw-bolder">U</span>
                <span className="text-warning fw-bolder">M</span>
                <span className="text-dark fw-bolder">B</span>
              </h5>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Tooltip title="Account">
              <p className="mt-2">
                <BsBookHalf style={{ fontSize: "17px" }} />
              </p>
            </Tooltip>
            <Tooltip title="Notification">
              <p className="mx-3 mt-2">
                <IoIosNotifications style={{ fontSize: "20px" }} />
              </p>
            </Tooltip>
            <Box
              sx={{
                mt: 1,
                flexGrow: 0,
                display: { xs: "block", md: "flex" },
                width: "50px",
                height: "50px",
              }}
            >
              <Tooltip title="Open settings">
                <p
                  onClick={handleOpenUserMenu}
                  className="shadow balance rounded-3"
                >
                  <img
                    className="dashboard_logo img-fluid rounded-5 w-100"
                    src={require("../images/User.JPG")}
                    alt=""
                  />
                </p>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppNav;
