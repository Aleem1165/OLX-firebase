
function addUid (data) {
    return{
        type:"ADDUID",
        payload:data
    }
}

function removeUid (data) {
    return{
        type:"REMOVE",
        payload:data
    }
}

export {
    addUid,
    removeUid
}