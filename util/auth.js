// HashMap
const sessionIDTOMapUser = new Map();

function setUser(id, user) {
    
    sessionIDTOMapUser.set(id, user);
}

function getUser(id){
    return sessionIDTOMapUser.get(id);
}

module.exports = {
    getUser,
    setUser
}