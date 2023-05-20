import "./index.css";
import { logoutUser } from "../../config/firebase";
import { useEffect, useState } from "react";
import BasicModal from "../../compunents/muiModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../compunents/dashboardHeader";
import { getAllAdsFirebase } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { deleteStore } from "../../store/action/searchAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";
import { addFavoriteAd } from "../../store/action/favoriteAdAction";
import { auth } from "../../config/firebase";

const black = {
  backgroundColor: "black",
  width: "100%",
  height: "100vh",
  color: "white",
};

const white = {
  backgroundColor: "white",
  width: "100%",
  height: "100vh",
  color: "black",
};

// const addCard = {
//   width: "300px",
//   height: "200px",
//   backgroundColor: "red",
//   marginTop: "10px",
// };

// const mainDiv={
//   border:"2px soid yellow",
//   width:"100%",
//   // height:"100%"
//   display: "grid",
//   gridTemplateColumn:"100px 100px "
// }

const dashboardContainerBlack = {
  width: "100%",
  backgroundColor: "black",
  color: "black",
};

const dashboardContainerWhite = {
  width: "100%",
  backgroundColor: "red",
};

// const imgStyle = {
//   width: "50px",
//   height: "50px",
// };

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [allAdsData, setAllAdsData] = useState([]);

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  console.log("UpdateTheme", theme);

  const reduxSearch = useSelector((state) => state.Search.search);
  const reduxAd = useSelector((state) => state);

  useEffect(() => {
    getAllAds();
    if (reduxSearch !== "") {
      dispatch(deleteStore());
    }
  }, []);

  const getAllAds = async () => {
    let response = await getAllAdsFirebase();
    setAllAdsData(response.data);
  };

  const handleAdFavoriteAdd = (item) => {
    let obj = item;
    const uid = auth.currentUser.uid;
    // console.log("uid" , uid);
    obj.favoriteId = uid;
    console.log("objAfter========", obj);
    dispatch(addFavoriteAd(item));
    

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Add to favirite",
      showConfirmButton: false,
      timer: 1100,
    });
  };
  return (
    <>
      <div
      className={
        theme ? "dashboardWhiteContainer" : "dashboardBlackContainer"
      }
      >
        <div className="mainDiv">
          {allAdsData
            .filter((item) => item.tital.toLowerCase().includes(reduxSearch))
            .map((item, index) => {
              return (
                <div
                  key={index}
                  // className="addCard"
                  className ={
                    theme ? "addCard" : "addCardBlack"
                  }
                >
                  <h3>{item.tital}</h3>
                  <img
                    // style={imgStyle}
                    src={item.images}
                    onClick={() => {
                      navigate(`addDetail/${item.docId}`);
                    }}
                  />
                  <h5>{item.amount}</h5>
                  <FavoriteIcon
                    title="Delete"
                    onClick={() => {
                      handleAdFavoriteAdd(item);
                    }}
                  />
                </div>
              );
              // {item.tital}
            })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

{
  /* {allAdsData.map((item, index) => {
            // console.log("item-======>",item);
            return (
              <div 
              key={index} 
              // style={addCard}
              onClick={()=>{navigate(`addDetail/${item.docId}`)}}
              className="addCard"
              >
                <h3>{item.name}</h3>
                <img 
                // style={imgStyle} 
                src={item.images} />
                <h5>{item.amount}</h5>
              </div>
            );
          })} */
}
