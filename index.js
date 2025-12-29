const express = require("express");
const {connectDB} = require("./connection");
const urlRoute = require("./routes/url")

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});