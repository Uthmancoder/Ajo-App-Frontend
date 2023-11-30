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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { BsBookHalf } from "react-icons/bs";
import Loading from "./Loading";
import Sidenav from "./Sidenav"
import { Badge } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { resetUnreadMessages } from '../Redux/UnreadMessages'
import { fetchingSuccessful } from "../Redux/AllUsers";


const AppNav = () => {
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  console.log("Fetched User :", fetchedUser)
  const { unreadMessages } = useSelector((state) => state.UnreadMessages);
  console.log("Unread Messages :", unreadMessages)
  const isLoading = fetchedUser?.loading;
  const userimage = fetchedUser?.image;

  const { currentPath } = useLocation();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    handleCloseNavMenu();

    // Check if the current route is the message route
    if (location.pathname === "/dashboard/messages") {
      // When you navigate to the messages page, reset the unread message count
      dispatch(resetUnreadMessages());
    }
  }, [location]);


  const smallpages = [
    {
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      text: "Groups",
      link: "/dashboard/groups",
    },
    {
      text: "Account",
      link: "/dashboard/account",
    },
    {
      text: "Messages",
      link: "/dashboard/messages",
    },
    {
      text: "Settings",
      link: "/dashboard/settings",
    },
  ];
  const settings = [
    {
      text: "Profile",
      link: "/dashboard/settings",
    },
    {
      text: "Account",
      link: "/dashboard/account",
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
  const username = localStorage.getItem("Username");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching user data
        const response = await fetch(`http://localhost:3000/user/getData?username=${encodeURIComponent(username)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log(data)
        dispatch(fetchingSuccessful(data.userData)); // Dispatch action to update Redux store
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Unable to Fetch user data");
      }
    };

    const tokenExpirationCheck = setInterval(async () => {
      if (!userToken || !FetchUserByToken(userToken)) {
        clearInterval(tokenExpirationCheck);
        alert('Your login session has expired, try logging in again');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        // Token is still valid, fetch user data
        await fetchData();
      }
    }, 100000);

    // Fetch initial user data
    fetchData();

    return () => {
      clearInterval(tokenExpirationCheck);
    };
  }, [navigate, userToken, username, dispatch]);

  useEffect(() => {
    handleCloseNavMenu()
  }, [currentPath])

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
      <AppBar className="bg-primary position-sticky top-0  navbar w-full" style={{ height: "fitContent" }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="d-flex itmes-center justify-content-between">

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
                  className="dashboard_logo img-fluid rounded-1"
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

            <div className="d-flex align-items-center justify-content-between gap-2">
              <Tooltip title="Account" >
                <Link to="/dashboard/account" className=" text-light ">
                  <BsBookHalf style={{ fontSize: "17px", color: "white" }} />
                </Link>
              </Tooltip>
              <Tooltip title="Notification">
                <Link to="/dashboard/messages" className="mx-3 text-light">
                  {unreadMessages > 0 ? (
                    <Badge color="secondary" badgeContent={unreadMessages} variant="dot">
                      <IoIosNotifications style={{ fontSize: "20px", color: "white" }} />
                    </Badge>
                  ) : (
                    <IoIosNotifications style={{ fontSize: "20px", color: "white" }} />
                  )}
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
                      style={{ width: "50px", height: "50px" }}
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
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <ToastContainer />
    </div>
  );
};

export default AppNav;
