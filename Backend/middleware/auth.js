const { getUser } = require("../util/auth");

async function checkForLoginUser(req, res, next) {
    const cookieToken = req.cookies?.uid;
    
    const headerToken = req.headers["authorization"]?.split("Bearer ")[1];

    const token = cookieToken || headerToken;

    if (!token) {
        return res.status(401).json({ error: "User not authenticated (No Token)" });
    }

    const user = getUser(token);

    if (!user) {
        return res.status(401).json({ error: "User not authenticated (Invalid Token)" });
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const cookieToken = req.cookies?.uid;
    const headerToken = req.headers["authorization"]?.split("Bearer ")[1];
    
    const token = cookieToken || headerToken;
    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = { checkForLoginUser, checkAuth };