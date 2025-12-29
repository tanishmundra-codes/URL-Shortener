const express = require("express");
const router = express.Router();
const { handleCreateNewUrl, handleRedirectUrl, handleAnalytics } = require("../controllers/url")

router.post("/", handleCreateNewUrl);
router.get("/:shortID", handleRedirectUrl);
router.get("/analytics/:id", handleAnalytics);

module.exports = router;