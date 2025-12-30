const urlModel = require("../models/url");
const { nanoid } = require("nanoid");

async function handleCreateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is Required" });

    const shortID = nanoid(8);
    try {
        await urlModel.createShortURL(
            shortID,
            body.url
        );
        return res.status(201).json({ shortID : shortID });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleRedirectUrl(req, res) {
    const shortID = req.params.shortID;

    try {
        const entry = await urlModel.getRedirectURL(shortID);
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        await urlModel.logVisit(shortID);

        res.redirect(entry.redirect_url);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleAnalytics(req, res) {
    const ID = req.params.id;

    try {
        const log = await urlModel.viewAnalytics(ID);
        if (!log) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        
        return res.json({ totalClicks : log.visit_history.length, visitHistory : log.visit_history});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleGetAllUrls(req, res) {
    try {
        const allUrls = await urlModel.getAllUrls();

        return res.json(allUrls);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

module.exports = {
    handleCreateNewUrl,
    handleRedirectUrl,
    handleAnalytics,
    handleGetAllUrls
}