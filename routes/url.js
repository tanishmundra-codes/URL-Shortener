const express = require("express");
const router = express.Router();
const { handleCreateNewUrl, handleGetAllUrls, handleAnalytics } = require("../controllers/url")

router.post("/", handleCreateNewUrl);
router.get("/analytics/:id", handleAnalytics);
router.get("/analytics/", handleGetAllUrls)

module.exports = router;