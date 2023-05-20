// import Button from "../../compunents/button";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { signupUser } from "../../config/firebase";
import Header from "../../compunents/header";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { auth } from "../../config/firebase" 
import { addUid } from "../../store/action/uidStoreAction";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  let userData = {
    firstName,
    lastName,
    email,
    pass,
    image,
  };

  const signup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCherecter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Wrong Email!",
        text: "Email must be have (@) and (.).",
      });
      setEmail("");
    } else {
      if (pass.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Wrong Password!",
          text: "Password length should be contain minimum 6 cherecter.",
        });
        setPass("");
      } else {
        if (!specialCherecter.test(pass)) {
          Swal.fire({
            icon: "error",
            title: "Wrong Password!",
            text: "Password must be at least one uppercase, one lowercase, one number and one special cherecter.",
          });
          setPass("");
        } else {
          navigate("/loader");

          let response = await signupUser(userData);
          console.log("signup response======>", response);
          navigate("/signup");

          if (response.status === "error") {
            Swal.fire({
              icon: "error",
              title: "Email already in use",
            });
            setEmail("");
          } else {
            const uid = auth.currentUser.uid;
            console.log("uid==========>", uid);

            dispatch(addUid(uid));
            Swal.fire({
              title: "Signup Successfully!",
              icon: "success",
            });
            navigate("/dashboard");
          }
        }
      }
    }
  };

  return (
    <>
      {/* <Header/> */}
      <div className={theme ? "loginSignupBox" : "loginSignupBoxBlack"}>
        <h1>Signup</h1>
        <TextField
          type={"text"}
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          type={"text"}
          value={lastName}
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type={"email"}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type={"password"}
          label="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {/* <TextField
        type={"file"}
        // label="image"
        inputProps={{
          multiple: true
        }}
        // value={image}
        onChange={(e) => setImage(e.target.files)}
        className={"inputfile"}
         /> */}

        <input
          accept="image/*"
          // className={classes.input}
          style={{ display: "none" }}
          id="raised-button-file"
          // multiple
          type="file"
          onChange={(e) => setImage(e.target.files)}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" type="file">
            Upload pictures
          </Button>
        </label>

        {/* <Button  variant="contained" size="large" >Upload Picture</Button>
         <input type="file" id="file" accept="image/*" /> */}
        <Button variant="contained" onClick={() => signup("clicked")}>
          Signup
        </Button>
      </div>
    </>
  );
}

export default Signup;
