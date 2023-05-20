import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { getAllUserData } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { uploadAdsImg } from "../../config/firebase";
import { TextField } from "@mui/material";
import { Component } from "react";
import { render } from "react-dom";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: 550,
  bgcolor: "white",
  border: "2px dashed #000",
  boxShadow: 24,
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
  width: "80%",
  height: 550,
  bgcolor: "#ffffff8f",
  border: "2px dashed #000",
  boxShadow: "#ffffff 0px 20px 30px -10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "10px",
  color: "white",
};

const fieldSetStyle = {
  width: 1000,
  height: 530,
  border: "3px solid black",
  borderRadius: " 5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const legendstyle = {
  fontWeight: "bolder",
  marginLeft: "20px",
};

const textAreaStyle = {
  background: "transparent",
  borderRadius: "5px",
  width: "80%",
  padding: "10px ",
  color:"black"
};

const divStyle = {
  width: "90%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
};

export default function CreateAddBasicModal(props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [tital, setTital] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [productCondition, setProductCondition] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [discription, setDiscription] = React.useState("");

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  var today = new Date();

  const addDetails = {
    name,
    contact,
    location,
    tital,
    amount,
    productCondition,
    postDate:
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear(),
    discription,
  };

  const uploadAds = async () => {
    navigate("/dashboardLoader");
    let response = await uploadAdsImg(image, addDetails);
    console.log("OriginalPageResponse=========>", response.status);
    Swal.fire({
      title: "Ad posted successfully",
      icon: "success",
    });
    navigate("/dashboard");
  };
  return (
    <Box sx={theme ? style : styleBlack}>
      <div>
        <fieldset style={fieldSetStyle}>
          <legend style={legendstyle}>Create Add</legend>
          <div style={divStyle}>
            <TextField
              type={"text"}
              value={name}
              label="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type={"number"}
              value={contact}
              label="Contact Number"
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              type={"text"}
              value={location}
              label="Your location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div style={divStyle}>
            <TextField
              type={"text"}
              value={tital}
              label="Tital"
              onChange={(e) => setTital(e.target.value)}
            />
            <TextField
              type={"number"}
              value={amount}
              label="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              type={"text"}
              value={productCondition}
              label="Product condition"
              onChange={(e) => setProductCondition(e.target.value)}
            />
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" type="file">
                Upload pictures
              </Button>
            </label>
          </div>
          <TextareaAutosize
            onChange={(e) => setDiscription(e.target.value)}
            value={discription}
            minRows={6}
            style={textAreaStyle}
            placeholder="Enter product discription"
          />
          <div style={divStyle}>
            <Button onClick={uploadAds} variant="contained">
              Post Add
            </Button>
            <Button
              onClick={() => {
                navigate("/dashboard");
              }}
              variant="contained"
            >
              cancle
            </Button>
          </div>
        </fieldset>
      </div>
    </Box>
  );
}
