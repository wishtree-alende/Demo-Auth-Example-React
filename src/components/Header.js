import React from "react";
import {
  AppBar,
  Box,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const authUser = useSelector((state) => state.user.userObj);
  const userData = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("userData.username", userData.username);
  let initials = userData?.username?.split(" ");

  // new changes added
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const logoutHandler = (e) => {
    localStorage.removeItem("user");
    localStorage.clear();
    dispatch(resetUser());
    navigate("/");
  };
  return (
    <AppBar className="header-section">
      <div className="nav">
        <div className="header-container">
          <Toolbar disableGutters>
            <div className="header-wrapper">
              <div className="header-left">
                <div className="logo-block">
                  <a href="/restoList">
                    {/* <img src="" alt="" className="img" /> */}
                    <label className="img">Zonion</label>
                  </a>
                </div>
              </div>
              <div className="header-right">
                <Box>
                  <div className="user-block flex-between">
                    <div className="user-image">
                      <span className="user-name-txt">
                        {initials?.length >= 1 && initials[0].slice(0, 1)}
                      </span>
                    </div>
                    <div className="user-info">
                      <span className="user-name">
                        {" "}
                        {/* {initials?.length >= 1 && initials[0].slice(0, 5)} */}
                        {userData?.username}
                      </span>
                      {/* <span className="user-type">
                        <KeyboardArrowDownIcon />
                      </span> */}
                    </div>
                    <div
                      className="logout-btn"
                      onClick={(event) => logoutHandler()}
                    >
                      Logout
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </Toolbar>
        </div>
      </div>
    </AppBar>
    // <AppBar position="static">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "none", md: "flex" },
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         LOGO
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: "bottom",
    //             horizontal: "left",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: "block", md: "none" },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href=""
    //         sx={{
    //           mr: 2,
    //           display: { xs: "flex", md: "none" },
    //           flexGrow: 1,
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         LOGO
    //       </Typography>
    //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
    //         {pages.map((page) => (
    //           <Button
    //             key={page}
    //             onClick={handleCloseNavMenu}
    //             sx={{ my: 2, color: "white", display: "block" }}
    //           >
    //             {page}
    //           </Button>
    //         ))}
    //       </Box>

    //       <Box sx={{ flexGrow: 0 }}>
    //         <Tooltip title="Open settings">
    //           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //             <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //           </IconButton>
    //         </Tooltip>
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
};

export default Header;
