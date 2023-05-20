import "../dashboard/index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { auth } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { deleteFavoriteAd } from "../../store/action/favoriteAdAction";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

const dashboardContainer = {
  width: "100%",
  minHeight: "100vh",
};

function FavoriteAdd() {
  const reduxAd = useSelector((state) => state.Favorite.favorite);
  const reduxUid = useSelector((state) => state.HandleUid.uid);
    console.log("reduxAd====>", reduxAd);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uid, setUid] = useState("");

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboardaleeem========>", reduxTheme);

  // useEffect(() => {
  // });
  useEffect(() => {
    // getUid()
    setTheme(reduxTheme);
    setUid(reduxUid);
  });
    console.log("FinalUid=====>", reduxUid);

  const handleDeleteFavorite = (item, index) => {


    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(item);
        let copyArr = [...reduxAd];
        console.log(copyArr)
        let currUserAllFav = copyArr.filter(copyArr => copyArr.favoriteId === item.favoriteId)
        currUserAllFav.splice(index, 1)
        console.log("currUserAllFav===>" , currUserAllFav);
    
        let nonCurrUserAllFav = copyArr.filter(copyArr => copyArr.favoriteId !== item.favoriteId)
        console.log("nonCurrUserAllFav=====>", nonCurrUserAllFav);
    
        let finalFavAdd = nonCurrUserAllFav.concat(currUserAllFav)
        console.log("Final=======>", finalFavAdd);
    
    
        dispatch(deleteFavoriteAd(finalFavAdd));


        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    // console.log(item);
    // let copyArr = [...reduxAd];
    // console.log(copyArr)
    // let currUserAllFav = copyArr.filter(copyArr => copyArr.favoriteId === item.favoriteId)
    // currUserAllFav.splice(index, 1)
    // console.log("currUserAllFav===>" , currUserAllFav);

    // let nonCurrUserAllFav = copyArr.filter(copyArr => copyArr.favoriteId !== item.favoriteId)
    // console.log("nonCurrUserAllFav=====>", nonCurrUserAllFav);

    // let finalFavAdd = nonCurrUserAllFav.concat(currUserAllFav)
    // console.log("Final=======>", finalFavAdd);


    // dispatch(deleteFavoriteAd(finalFavAdd));


  };

  return (
    <>
      <h1>Your Favorite Ads</h1>
      <div style={dashboardContainer}>
        <div className="mainDiv">
          {reduxAd
            .filter((item) => item.favoriteId === reduxUid)
            .map((item, index) => {
              return (
                <div
                  key={index}
                  // style={addCard}

                  className={theme ? "addCard" : "addCardBlack"}
                >
                  <h3>{item.tital}</h3>
                  <img
                    // style={imgStyle}
                    src={item.images}
                    onClick={() => {
                      // console.log(item.docId);
                      navigate(`addDetail/${item.docId}`);
                    }}
                  />
                  <h5>{item.amount}</h5>
                  {/* <button
                    onClick={() => {
                      handleDeleteFavorite(item, index);
                    }}
                  >
                    delete
                  </button> */}
                    <DeleteIcon
                    onClick={() => handleDeleteFavorite(item , index)}
                    
                    />
                  {/* <FavoriteIcon title="Delete" onClick={() => {handleAdFavoriteAdd(item)}} /> */}
                </div>
              );
              // {item.tital}
            })}
        </div>
      </div>
    </>
  );
}

export default FavoriteAdd;

// <h1>Your Favorite Ads</h1>
// <div style={dashboardContainer}>
//   {/* <DashboardHeader
//   // setSearch={setSearch}  SEARCH 01
//   /> */}
//   <div className="mainDiv">
//     {reduxAd
//       .filter((item) => item.favoriteId == reduxUid)
//       .map((item, index) => {
//         return (
//           <div
//             key={index}
//             // style={addCard}

//             className="addCard"
//           >
//             <h3>{item.tital}</h3>
//             <img
//               // style={imgStyle}
//               src={item.images}
//               onClick={() => {
//                 // console.log(item.docId);
//                 navigate(`addDetail/${item.docId}`);
//               }}
//             />
//             <h5>{item.amount}</h5>
//             <button
//               onClick={() => {
//                 // console.log(item);
//                 // dispatch(deleteFavoriteAd(item))
//               }}
//             >
//               delete
//             </button>
//             {/* <FavoriteIcon title="Delete" onClick={() => {handleAdFavoriteAdd(item)}} /> */}
//           </div>
//         );
//         // {item.tital}
//       })}
//   </div>
// </div>
