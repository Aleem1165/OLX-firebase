import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { getAllUserData } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 550,
  bgcolor: "background.paper",
  border: "2px dashed #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "10px",
};

const styleBlack = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 550,
  bgcolor: "black",
  border: "2px dashed white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "10px",
};

const imgStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
};

const imgStyleBlack = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  border:"2px solid white"
};

const fieldSetStyle = {
  border: "3px solid black",
  borderRadius: " 5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const legendstyle = {
  fontWeight: "bolder",
  marginLeft: "20px",
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currUserData, setCurrUserData] = React.useState("");
  const navigate = useNavigate();
  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboardaleeem========>", reduxTheme);

  // useEffect(() => {
  // });
  
  useEffect(() => {
    getCurrentUser();
    setTheme(reduxTheme);
  }, []);

  const getCurrentUser = async () => {
    let response = await getAllUserData();
    console.log("res======-=->", response.data);
    const uid = auth.currentUser.uid;
    console.log(uid);

    let arr = response.data;
    console.log(arr);

    let current = arr.find((arr) => arr.uid === uid);
    console.log("==============>", current);

    setCurrUserData(current);
    console.log("==========p=p==p=p=p===>", currUserData);
  };
  return (
    <Box sx={
      theme ? style : styleBlack
    }
    
    // {style}
    >
      <div>
        <fieldset style={fieldSetStyle}>
          <legend style={legendstyle}>Your Profile</legend>
          {<img src={currUserData.userPicture} 
          style={ 
            theme ? imgStyle : imgStyleBlack
            } />}
          <table width={"350"} height={"200"}>
            <tr>
              <th>Name:</th>
              <td>{`${currUserData.firstName} ${currUserData.lastName}.`}</td>
            </tr>
            <tr>
              <th>Eamil:</th>
              <td>{currUserData.email}.</td>
            </tr>
            <tr>
              <th>User Id:</th>
              <td>{currUserData.uid}.</td>
            </tr>
          </table>
        </fieldset>
      </div>
      <Button
        onClick={() => {
          navigate("/dashboard");
        }}
        variant="contained"
      >
        Back
      </Button>
      {/* <input
        accept="image/*"
        // className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" type="file">
          Upload
        </Button>
      </label> */}
    </Box>
  );
}
