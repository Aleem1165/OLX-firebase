import "./App.css";
import { useState , useEffect } from "react";
import Login from "./view/login";
import Dashboard from "./view/dashboard";
import Signup from "./view/signup";
import BasicModal from "./compunents/muiModal";
import CircularStatic from "./compunents/loader";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Routing from "./config/router";
import { useSelector } from "react-redux";

function App() {


  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboardaleeem========>", reduxTheme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

 



  return (
    <>
      <div
       className={
        theme ? "container" : "containerBlack"
       }
       >
         <Routing/>
      </div>
    </>
  );
}

export default App;
