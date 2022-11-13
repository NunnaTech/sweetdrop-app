function setData(key, value) {
    localStorage.setItem(key, value);
}

function clear(){
    localStorage.clear();
}

function getToken() {
    return localStorage.getItem('token') || '';
}

function getUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
}

export {
    setData,
    getToken,
    getUser,
    clear
}