import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ButtonAppBar from "./navBar";
import TemporaryDrawer from "./navBar/sideBar";
import { useSelector } from "react-redux";

const style = {
  margin: "0",
  padding: "0",
  boxSizing: "border-box",
  width: "100%",
  height: "65px",
  backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  // position:"static",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position:"fixed",
  //   top:"0px",
};

function DashboardHeader(props) {
  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboard", reduxTheme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  return (
    <>
      <div className={theme ? "whiteDashboardHeader" : "blackDashboardHeader"}>
        <ButtonAppBar
        //  setSearchParent={setSearchParent} SEARCH 04
        ></ButtonAppBar>
      </div>
    </>
  );
}

export default DashboardHeader;
