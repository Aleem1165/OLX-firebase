import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./sideBar";
import logo1 from "../../../images/headerLogo1.png";
import BasicSelect from "../selectTag";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import { logoutUser } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../../store/action/searchAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { removeUid } from "../../../store/action/uidStoreAction";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { handleTrue, handleFalse } from "../../../store/action/themeReducer";

const style = {
  backgroundColor: "",
  border: "2px solid red",
  // boxShadow:
  //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  width: "100%",
  height: "70px",

  // border: "2px solid red",
  width: "100%",
  height: "70px",
  // display: "flex",
  // flexDirection: "row",
  // verticalAlign: "bottom",
  // alignItems: "center",
  // justifyContent: "center",
};

const imgStyle = {
  width: "70px",
  height: "90%",
  // border: "1px solid black",
  // position:"static",
};

const divStyle = {
  // border: "2px solid red",
  width: "100%",
  height: "70px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  // backgroundColor: "yellow",
};

const lableStyle = {
  fontWeight: "bold",
  fontSize: "20px",
};

export default function ButtonAppBar() {
  // const { searchParent } = props; SEARCH 05
  const reduxSearch = useSelector((state) => state.Search.search);
  
  const reduxTheme = useSelector((state) => state.Theme.theme);
  const [theme, setTheme] = React.useState(false);

  // React.useEffect(() => {
  //   setTheme(reduxTheme);
  // }, []);

  // console.log("Reduxtheme", reduxTheme);
  // console.log("theme", theme);

  const [search, setSearch] = React.useState();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // console.log("reduxSearch ===========>",reduxSearch);
  // console.log("search" , search);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    let response = await logoutUser();
    dispatch(removeUid());
    navigate("/");
  };

  return (
    <div>
      {/* <Box
      sx={{ flexGrow: 1,
        backgroundColor: 'primary.dark',
      
      }}
      > */}
      {/* <AppBar position="static"> */}
      <div style={divStyle}>
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
        <img src={logo1} style={imgStyle} />

        {/* <BasicSelect /> */}

        {/* SELECT INPUT */}
        {/* <fieldset className="headerLocation">
          <legend>Location</legend>
        </fieldset> */}
        <div className={theme ? "headerLocationBlack" : "headerLocationWhite"}>
          <LocationOnIcon />
          <select>
            <option hidden>Select Location</option>
            <option>Karachi</option>
            <option>Hyderabaad</option>
            <option>Punjab</option>
            <option>Balochestan</option>
            <option>Lahore</option>
            <option>Islamabaad</option>
          </select>
        </div>

        {/* SEARCH INPUT */}
        <div className="searchInput">
          <input
            type={"text"}
            placeholder={"Search by tital"}
            onChange={(e) => dispatch(store(e.target.value))}
          />
          <SearchIcon />
        </div>

        <Button variant="contained" onClick={() => logout("clicked")}>
          Logout
        </Button>
        {/* <button
              onClick={() => {
                dispatch(handleTrue(theme));
                // console.log("theme", reduxTheme);
                setTheme(reduxTheme)
              }}
              >
              whiteeee
            </button> */}

        {/* <WbSunnyIcon
          onClick={() => {
            dispatch(handleTrue(theme));
            setTheme(reduxTheme);
          }}
          style={{ cursor: "pointer" }}
        />
        <DarkModeIcon
          onClick={() => {
            dispatch(handleFalse(theme));
            setTheme(reduxTheme);
            // console.log("work");
          }}
          style={{ cursor: "pointer" }}
        /> */}

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
      <TemporaryDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      ></TemporaryDrawer>

      {/* </Box> */}
    </div>
  );
}
