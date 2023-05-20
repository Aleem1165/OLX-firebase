import { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Swal from "sweetalert2";
import { loginUser, alreadyLogin } from "../../config/firebase";
import Header from "../../compunents/header";
import { Button, TextField } from "@mui/material";
import { CircularStatic } from "../../compunents/loader";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
// import { useDispatch } from "react-redux";
import { useDispatch ,useSelector } from "react-redux";
// import { addUid } from "../../store/action/uidStoreAction"
import { addUid } from "../../store/action/uidStoreAction";


function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  const login = async () => {
    navigate("/loader")    
    let response = await loginUser(email, pass);
    // console.log("login=======>", response);
    navigate("/")
    if (response.status === "success") {
      const uid = auth.currentUser.uid
      console.log("uid==========>",uid);

      dispatch(addUid(uid))
      Swal.fire({
        title: "Login Successfully!",
        icon: "success",
      });


      navigate("/dashboard");
    } else {
      if (response.error === "Firebase: Error (auth/user-not-found)."  ) {
        Swal.fire({
          icon: "error",
          title: "wrong Email!",
        });
        setEmail("");
      }
      else {
        if(response.error === "Firebase: Error (auth/missing-password)."){
         Swal.fire({
          icon: "error",
          title: "Password not found",
        });
        }else{
          if(response.error === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
          ){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Access to this account has been temporarily disabled due to many failed login attempts.Try again leter.",
            })
          }else{
            Swal.fire({
              icon: "error",
              title: "Wrong password.",
            });
            setPass("")
          }
        }
      // Swal.fire({
      //     icon: "error",
      //     title: "Wrong password!",
      //   });
      //   setPass("")
      }
    }
  };

  const Signup = () => {
    // props.setScreen("Signup");
    // console.log(email)
    // setEmail("")
    navigate("/signup")
  };

  return (
    <>
      {/* <Header/> */}
      <div className={
        theme ? "loginSignupBox" : "loginSignupBoxBlack"
      }>
        <h1>Login</h1>

        <TextField
          type={"text"}
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type={"Password"}
          value={pass}
          label="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        {/* <Button name={"Login"} press={login} />
        <Button name={"Signup"} press={Signup} /> */}
        <Button variant="contained" onClick={() => login("clicked")}>
          Login
        </Button>
        <Button variant="contained" onClick={() => Signup("clicked")}>
          Signup
        </Button>
        {/* <AccessAlarmIcon fontSize="large" color="secondary" /> */}
      </div>
    </>
  );
}

export default Login;
