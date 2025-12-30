const express = require("express");
const { connectDB } = require("./connection");
const urlRoute = require("./routes/url")
const cors = require("cors");
const {handleRedirectUrl} = require("./controllers/url")

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortID", handleRedirectUrl);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});