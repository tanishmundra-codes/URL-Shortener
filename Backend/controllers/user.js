const userModel = require("../models/user")
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../util/auth")

async function handleSignup(req, res) {
    const body = req.body;

    try {
        await userModel.createUser(
            body.name,
            body.email,
            body.password
        )

        return res.status(201).json({ status: "User created" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email)

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        if (user.password_hash !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = setUser(user);

        res.cookie("uid", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None", 
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({ message: "Login successful", user: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleLogoutUser(req, res) {
    res.clearCookie("uid");

    return res.json({ status: "success", msg: "Logged out successfully" });
}


module.exports = {
    handleSignup,
    handleLogin,
    handleLogoutUser
}