
function handleTrue (data){
    return{
        type:"TRUE",
        payload:data
    }
}

function handleFalse (data){
    return{
        type:"FALSE",
        payload:data
    }
}

export {
    handleTrue,
    handleFalse
}