require('dotenv').config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET

function setUser(user) {
    return jwt.sign({
        id : user.id,
        email : user.email,
    }, secretKey );
}

function getUser(token){
    if(!token) return null

    try{
        return jwt.verify(token, secretKey);
    }catch(error){
        return null
    }
    
}

module.exports = {
    getUser,
    setUser
}