
const initialState = {uid : ""}

export default function HandleUid(state = initialState , action) {
    switch(action.type){
        case "ADDUID":
            return {...state , uid : action.payload};
        case "REMOVE":
            return {...state, uid : ""};
        default:
            return state;
    }
}