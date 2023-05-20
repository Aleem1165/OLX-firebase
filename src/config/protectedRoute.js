import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute(props){

    const {Compunent}=props
    const navigate = useNavigate()

    const haveUser = async ()=>{
       await onAuthStateChanged (auth , (user) =>{
          if(!user){
            // console.log("User========>",user);
            navigate("/")
          }
        })
    }

    useEffect(()=>{
        haveUser()
    })
    
    return(
        <>
        <Compunent/>
        </>
    )
}

export default ProtectedRoute;