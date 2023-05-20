import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./sideBar";
import logo1 from "../../../images/headerLogo1.png"
import { useSelector , useDispatch } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { handleFalse , handleTrue } from "../../../store/action/themeReducer";

const style = {
  backgroundColor: "",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  width:"100%",
  height:"70px"
 
    // border: "2px solid red",
  // width: "100%",
  // height: "70px",
  // display: "flex",
  // flexDirection: "row",
  // verticalAlign: "bottom",
  // alignItems: "center",
  // justifyContent: "spaceEvenly",
};

const imgStyle = {
  width: "70px",
  height: "90%",
  // border: "1px solid black",
};

const divStyle={
  // border:"2px solid red",
  width:"100%",
  height:"70px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",


}
export default function ButtonAppBar() {


  const reduxTheme = useSelector((state) => state.Theme.theme);
  const [theme, setTheme] = React.useState(false);
  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <Box
    // sx={{ flexGrow: 1 }}
    >
      {/* <AppBar position="static"> */}
      <Toolbar style={style}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          // sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> */}
        <img
              src={logo1}
              style={imgStyle}
            />
          <div style={divStyle}>
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png"
              style={imgStyle}
            /> */}
            <h1 className="textStyle">WELCOME TO OLX</h1>
            {/* <h1>Welcome to</h1> */}

            {reduxTheme ? (
          
          
          <DarkModeIcon
            onClick={() => {
              dispatch(handleFalse(theme));
              setTheme(reduxTheme);
              // console.log("work");
            }}
            style={{ cursor: "pointer" }}
          />
          ) : (
          <WbSunnyIcon
            onClick={() => {
              dispatch(handleTrue(theme));
              setTheme(reduxTheme);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
          </div>
        {/* </Typography> */}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
      {/* </AppBar> */}
      <TemporaryDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      ></TemporaryDrawer>
    </Box>
  );
}
