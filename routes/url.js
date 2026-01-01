const express = require("express");
const router = express.Router();
const { handleCreateNewUrl,handleAnalytics, handleGetUserUrls } = require("../controllers/url")

router.post("/", handleCreateNewUrl);
router.get("/analytics/:id", handleAnalytics);
router.get("/analytics/", handleGetUserUrls)

module.exports = router;