import { combineReducers } from "@reduxjs/toolkit";
// import SaveData from "./reducer/addReduer";
import Search from "./reducer/searchReduces";
import Favorite from "./reducer/favoriteAdReducer";
import HandleUid from "./reducer/uidStoreReducer";
import Theme from "./reducer/themeReducer";

const rootReducer = combineReducers({
    Search:Search,
    Favorite:Favorite,
    HandleUid:HandleUid,
    Theme:Theme,
});

export default rootReducer;