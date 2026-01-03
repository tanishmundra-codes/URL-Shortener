const express = require("express");
const router = express.Router();
const {checkAuth} = require("../middleware/auth")

const { handleCreateNewUrl,handleAnalytics, handleGetUserUrls } = require("../controllers/url")

router.post("/", handleCreateNewUrl);
router.get("/analytics/:id", handleAnalytics);
router.get("/analytics/", checkAuth, handleGetUserUrls)

module.exports = router;