

function store(data){
    return {
        type:"STORE",
        payload:data,
    }
}

function deleteStore(){
    return {
        type:"DELETE",
    }
}

export {
    store,
    deleteStore
}