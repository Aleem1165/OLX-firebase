const initialState = {theme:false}

export default function Theme (state = initialState , action) {
    switch (action.type){
        case "TRUE":
            return{...state, theme : true};
        case "FALSE":
            return {...state, theme : false};
        default:
            return state
    }
}