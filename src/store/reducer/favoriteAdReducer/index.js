// const initialState = {favorite : ""}
const initialState = {
  favorite: [],
};

export default function Favorite(state = initialState, action) {
  switch (action.type) {
    case "addFavoriteAd":
      return { ...state, favorite: [...state.favorite, action.payload] };
    case "deleteFavoriteAd":
      //    return {...state.favorite.slice(action.payload)};
      console.log(action.payload)
      return {...state, favorite: action.payload};
    default:
      return state;
  }
}
