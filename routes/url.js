const express = require("express");
const router = express.Router();
const {handleCreateNewUrl} = require("../controllers/url")

router.post("/", handleCreateNewUrl);
// router.get("/:id", handleRedirectUrl);
// router.get("/analytics/:id", handleAnalytics);

module.exports = router;