// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8aARNosnUX98OBPy__J1R0iYgHuaADhY",
  authDomain: "olx-3ea5f.firebaseapp.com",
  projectId: "olx-3ea5f",
  storageBucket: "olx-3ea5f.appspot.com",
  messagingSenderId: "831997485338",
  appId: "1:831997485338:web:8806826221122740c4cca3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signupUser = async (userData) => {
  try {
    // console.log("signupUserStart");
    const response = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.pass
    );
    // console.log("firebaseEROR", response.user.uid);
    let url = "";
    // console.log("image url===========>",userData.image)
    if (userData.image[0]) {
      //For image upload
      const imageName = userData.image[0].name;
      const folderName = "userPics/";
      const imageRef = await ref(storage, folderName + imageName);
      // console.log(imageRef);
      const uploadBytesRes = await uploadBytes(imageRef, userData.image[0]);
      // console.log(uploadBytesRes);
      url = await getDownloadURL(uploadBytesRes.ref);
      // console.log("image url =============>", url);
    }

    const resDb = await addDoc(collection(db, "usersData"), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      uid: response.user.uid,
      userPicture: url,
    });
    // console.log("resDb=======>", resDb);
    return {
      status: "success",
      response,
    };
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    };
  }
};

const loginUser = async (email, pass) => {
  // console.log("login");

  try {
    let user = await signInWithEmailAndPassword(auth, email, pass);
    // console.log(user);
    return {
      status: "success",
      user: user,
    };
  } catch (error) {
    // console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
};

const logoutUser = async () => {
  // console.log("logout chl gyaa");
  try {
    await signOut(auth);
    return {
      status: "success",
    };
  } catch (error) {
    // console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
};

const getAllUserData = async () => {
  try {
    const q = query(collection(db, "usersData"));
    const querySnapshot = await getDocs(q);

    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    // console.log(arr)
    return {
      data: arr,
    };
  } catch (error) {
    // console.log(error.message);
  }
};

const uploadAdsImg = async (image, addDetails) => {
  const a = image.length;
  let imgArr = [];
  const {
    name,
    contact,
    location,
    tital,
    amount,
    productCondition,
    postDate,
    discription,
  } = addDetails;
  const uid = auth.currentUser.uid;
  try {
    for (let i = 0; i < a; i++) {
      const imageName = image[i].name;
      const folderName = "AllAdsPictures/";
      const imageRef = await ref(storage, folderName + imageName);
      const uploadBytesRes = await uploadBytes(imageRef, image[i]);
      const imgUrl = await getDownloadURL(uploadBytesRes.ref);
      imgArr.push(imgUrl);
      // console.log("imageAray==========>", imgArr);
      if (imgArr.length === image.length) {
        // return imgArr
        const res = await addDoc(collection(db, "adsData"), {
          name,
          contact,
          location,
          tital,
          amount,
          productCondition,
          postDate,
          discription,
          uid: uid,
          images: imgArr,
        });
        return {
          status: "success",
        };
      }
    }
  } catch (error) {
    return {
      status: "error",
    };
  }

};
const getAllAdsFirebase = async () => {
  // return "getAllAdsFirebase";
  try {
    const q = query(collection(db, "adsData"));
    const querySnapshot = await getDocs(q);

    let obj = {}
    let arr = [];
    querySnapshot.forEach((doc) => {
      obj = {...doc.data() }
      obj.docId = doc.id
      arr.push(obj);
      // console.log("doc.id=========>",doc.id)
    });
    return {
      data: arr,
    };
  } catch (error) {
    return error
  }
};

const getAddDetailFirebase = async ( params ) => {
  // console.log("getAddDetailFirebase", params.docId);
  try{
    const docRef = doc(db, "adsData" , params.docId)
    const docSnap = await getDoc(docRef)
    // console.log("dataaaa=======>",docSnap.data());
    return docSnap.data()
  }catch(error){
    // console.log(error);
    return error
  }
}

export {
  signupUser,
  loginUser,
  getAllUserData,
  auth,
  logoutUser,
  uploadAdsImg,
  getAllAdsFirebase,
  getAddDetailFirebase
};
