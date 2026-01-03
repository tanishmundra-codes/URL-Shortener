const {getUser} = require("../util/auth")

async function checkForLoginUser(req, res, next) {
    const userUid = req.cookies?.uid

    if(!userUid) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const user = getUser(userUid);

    if(!user){
        return  res.status(401).json({ error: "User not authenticated" });
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {checkForLoginUser,checkAuth};