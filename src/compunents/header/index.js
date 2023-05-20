import Button from "@mui/material/Button";
import ButtonAppBar from "./navBar";
import TemporaryDrawer from "./navBar/sideBar";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";

const style = {
  margin: "0",
  padding: "0",
  boxSizing: "border-box",
  width: "100%",
  height:"65px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
//   alignItems: "center",
//   justifyContent: "center",
//   position:"fixed",
//   top:"0px",
};

const styleBlack = {
  margin: "0",
  padding: "0",
  boxSizing: "border-box",
  width: "100%",
  height:"65px",
  backgroundColor: "black",
  display: "flex",
  flexDirection: "column",
  color:"white",
  boxShadow:
  "#ffffff 0px 0px 100px -20px, #ffffff 0px 10px 10px -30px, #ffffff 0px -2px 6px 0px inset"
//   alignItems: "center",
//   justifyContent: "center",
//   position:"fixed",
//   top:"0px",
};

function Header() {

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });
  return (
    <>
      <div style={
        theme ? style : styleBlack
      }>

        <ButtonAppBar></ButtonAppBar>
        {/* <TemporaryDrawer></TemporaryDrawer> */}
        {/* <Button variant="contained">Contained</Button> */}
      </div>
    </>
  );
}

export default Header;
