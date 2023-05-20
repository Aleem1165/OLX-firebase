import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });
  // const style = {
  //   // border: "1px solid red",
  //   marginTop: "10px",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   cursor:"pointer"
  // };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List 
      style={
        theme ? {
          height:"100vh",
          
        } :

        {
          height:"100vh",
          backgroundColor:"black",
          color:"white"
        }
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
