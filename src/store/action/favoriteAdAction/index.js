
function addFavoriteAd (data) { 
    return{
        type:"addFavoriteAd",
        payload:data,
    }
}

function deleteFavoriteAd (data) { 
    return{
        type:"deleteFavoriteAd",
        payload:data,
    }
}

export {
    addFavoriteAd,
    deleteFavoriteAd
}