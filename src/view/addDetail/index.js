import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAddDetailFirebase } from "../../config/firebase";
// import FbImageLibrary from "react-fb-image-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const mainDiv = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  //   border: "2px solid red",
  justifyContent: "space-evenly",
};

const right = {
  width: "70%",
  //   border: "2px solid green",
};

const left = {
  width: "30%",
  // height: "120vh",
  // border: "2px solid yellow",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const imgDiv = {
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  margin: "10px",
  padding: "5px",
  //   boxShadow: "rgba(168, 56, 56, 0.24) 0px 3px 8px"
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  //   boxShadow:
  //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
};

const imgStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
};

const allImgDiv = {
  width: "100%",
  height: "70px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  //   border: "1px solid red",
};

const allImgStyle = {
  width: "50px",
  height: "50px",
  margin: "5px",
  borderRadius: "50%",
  cursor: "pointer",
};

const disDiv = {
  width: "90%",
  //   border: "2px solid black",
  margin: "10px",
  padding: "5px",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "10px",
};

const detailDiv = {
  width: "80%",
  height: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  //   padding: "20px",
  //   border: "2px solid blue",
  borderRadius: "10px",
  marginBottom:"20px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};

const detailDivBlack = {
  width: "80%",
  height: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  //   padding: "20px",
  //   border: "2px solid blue",
  borderRadius: "10px",
  boxShadow: "rgba(199, 199, 199, 0.829) 0px 5px 15px",
  marginBottom:"20px"
};

const pStyle = {
    fontSize: "large",
}


function MyFavoriteAdddetail() {
  const navigate = useNavigate();
  const params = useParams();
  //   console.log(params);
  const [data, setData] = useState("");
  const [images, setImage] = useState([]);
  const [imagesSrc, setImageSrc] = useState();

  const [theme, setTheme] = useState(true);
  const reduxTheme = useSelector((state) => state.Theme.theme);
  // console.log("reduxThemeDashboardaleeem========>", reduxTheme);

  useEffect(() => {
    setTheme(reduxTheme);
  });

  useEffect(() => {
    getAddDetails();
  }, []);

  const getAddDetails = async () => {
    let response = await getAddDetailFirebase(params);
    // console.log("response=========>", response);

    setData(response);
    setImage(response.images);
    setImageSrc(response.images[0]);
  };
  //   console.log("images", images);
  //   console.log("data", data);

  const handleChangeImgSrc = (index) => {
    // console.log(index);
    setImageSrc(images[index]);
  };

  return (
    <div style={mainDiv}>
      <div style={right}>
        <div style={imgDiv}>
          <img src={imagesSrc} style={imgStyle} />
          <div style={allImgDiv}>
            {images.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  style={allImgStyle}
                  onClick={() => handleChangeImgSrc(index)}
                />
              );
            })}
          </div>
        </div>
        <div style={disDiv}>
          <h1>Discription</h1>
          <p style={pStyle}>{data.discription}</p>
        </div>
      </div>

      <div style={left}>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Name</h1>
          <p style={pStyle}>{data.name}</p>
        </div>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Contact</h1>
          <p style={pStyle}>+92 {data.contact}</p>
        </div>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Location</h1>
          <p style={pStyle}>{data.location}</p>
        </div>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Date</h1>
          <p style={pStyle}>{data.postDate}</p>
        </div>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Condition</h1>
          <p style={pStyle}>{data.productCondition}</p>
        </div>
        <div style={theme ? detailDiv : detailDivBlack}>
          <h1>Amount</h1>
          <p style={pStyle}>{data.amount}</p>
        </div>
      </div>
    </div>
  );
}

export default MyFavoriteAdddetail;

{
  /* <>
<div style={mainDiv}>
  Add detail page
  <div style={allImgDiv}>
  <img src={imagesSrc} style={imgStyle} />
    {images.map((item, index) => {
      return (
        <img
          key={index}
          src={item}
          style={allImgStyle}
          onClick={() => handleChangeImgSrc(index)}
        />
      );
    })}
  </div>
  <h1>{data.amount}</h1>
  <h1>{data.discription}</h1>
</div>
</> */
}
