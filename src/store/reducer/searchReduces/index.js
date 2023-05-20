const initialState = {search : ""}

export default function Search(state = initialState , action) {
    switch (action.type){
        case "STORE":
            return {...state, search : action.payload};
        case "DELETE":
            return {...state, search : ""}
        default:
            return state;
    }
}