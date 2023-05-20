import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  
  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboardaleeem========>", reduxTheme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List 
      className={
        theme ? "sideBar" : "sideBarBlack"
      }
      >
        <div className="sideBarDiv">
          <Link to="/">
            <h3>Login</h3>
          </Link>
        </div>
        <div className="sideBarDiv">
          <Link to="/signup">
            <h3>Signup</h3>
          </Link>
        </div>
        <div className="sideBarDiv">
          <Link to="/dashboard">
            <h3>Dashboard</h3>
          </Link>
        </div>
        <div className="sideBarDiv">
          <Link to="/dashboard/myProfile">
            <h3>My Profile</h3>
          </Link>
        </div>
        <div className="sideBarDiv">
          <Link to="/dashboard/createAdd">
            <h3>Create Add</h3>
          </Link>
        </div>
        <div className="sideBarDiv">
          <Link to="/dashboard/MyFavoriteAdd">
            <h3>MyFavoriteAdd</h3>
          </Link>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button >{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
