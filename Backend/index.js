const express = require("express");
const { connectDB } = require("./connection");
const urlRoute = require("./routes/url")
const cors = require("cors");
const {handleRedirectUrl} = require("./controllers/url")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const {checkForLoginUser, checkAuth} = require("./middleware/auth")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: [
        "http://localhost:5173",    
        "https://nano-url-three.vercel.app/"   
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/url", checkForLoginUser ,urlRoute);
app.use("/user" ,userRoute);


app.get("/:shortID", handleRedirectUrl);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});