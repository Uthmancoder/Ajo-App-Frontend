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
import { BiExit } from "react-icons/bi";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import FetchUserByToken from "./FetchUserByToken";
import AllUsers from "../Redux/AllUsers";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { BsBookHalf } from "react-icons/bs";
import Loading from "./Loading";
import Sidenav from "./Sidenav"

const AppNav = () => {
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const isLoading = fetchedUser?.loading;
  const userimage = fetchedUser?.user?.image;
  const pages = [
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Products",
      link: "https://uthmancoder-hexashop.netlify.app",
    },
    {
      text: "Portfolio",
      link: "https://uthmancoder-portfolio.netlify.app",
    },
  ];
  const smallpages = [
    {
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      text: "Groups",
      link: "/groups",
    },
    {
      text: "Account",
      link: "/account",
    },
    {
      text: "Messages",
      link: "/messages",
    },
    {
      text: "Settings",
      link: "/settings",
    },
  ];
  const settings = [
    {
      text: "Profile",
      link: "/settings",
    },
    {
      text: "Account",
      link: "/account",
    },
    {
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      text: "Logout",
      link: "/",
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
  };

  const handleLogout = () => {
    alert("Logging out");
    localStorage.removeItem("token");
    navigate("/"); // Navigate to the desired route after logout
  };
  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <AppBar className="bg-primary position-sticky top-0 w-full">
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
                width: { md: "25%" }
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
                <Sidenav className="slideIn" />
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
                <Link to={`${page.link}`}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.text}
                  </Button>
                </Link>
              ))}
            </Box>
            <Tooltip title="Account" >
              <Link to="/account" className=" text-light ">
                <BsBookHalf style={{ fontSize: "17px", color: "white"}} />
              </Link>
            </Tooltip>
            <Tooltip title="Notification">
              <Link to="/messages" className="mx-3  text-light">
                <IoIosNotifications style={{ fontSize: "20px", color : "white" }} />
              </Link>
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
                    className="dashboard_logo img-fluid rounded-circle"
                    style={{ width : "50px", height : "50px" }}
                    src={userimage}
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
                    <Link to={setting.link} className="text-decoration-none">
                      <Typography textAlign="center">
                        {setting.text}
                        {setting.link === "/" && (
                          <Tooltip title="Logout">
                            <span
                              onClick={handleLogout}
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                            >
                              <BiExit style={{ fontSize: "20px" }} />
                            </span>
                          </Tooltip>
                        )}
                      </Typography>
                    </Link>
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
