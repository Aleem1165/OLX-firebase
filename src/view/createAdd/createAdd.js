import { Button } from "@mui/material";
import { useState } from "react";
import { uploadAdsImg } from "../../config/firebase";

function CreateAdd (){
    const [image , setImage]=useState([])

    const uploadAds = async ()=>{
       console.log("aleem");
    }

    return(
        <>
        <h1>create add page</h1>
        <input type={"file"}/>
        <input
            accept="images"
            // className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={(e)=>setImage(e.target.files)}
          />
          <label htmlFor="raised-button-file">
            <Button variant="" component="span" 
            >
              Upload
            </Button>
          </label>
          <button onClick={uploadAds}>done</button>
        </>
    )
}

export default CreateAdd;