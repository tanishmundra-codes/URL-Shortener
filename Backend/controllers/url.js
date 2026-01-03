const { createShortURL, getUserUrls, viewAnalytics, getRedirectURL, logVisit} = require("../models/url");
const { nanoid } = require("nanoid");

async function handleCreateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is Required" });

    const shortID = nanoid(8);
    const userId = req.user ? req.user.id : null;

    try {
        await createShortURL(
            shortID,
            body.url,
            userId
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
        const entry = await getRedirectURL(shortID);
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        await logVisit(shortID);

        res.redirect(entry.redirect_url);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleAnalytics(req, res) {
    const ID = req.params.id;

    try {
        const log = await viewAnalytics(ID);
        if (!log) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        
        return res.json({ totalClicks : log.visit_history.length, visitHistory : log.visit_history});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Database Error" });
    }
}

async function handleGetUserUrls(req, res) {
    if (!req.user) {
        return res.json([]); 
    }

    const urls = await getUserUrls(req.user.id);
    
    return res.json(urls);
}

module.exports = {
    handleCreateNewUrl,
    handleRedirectUrl,
    handleAnalytics,
    handleGetUserUrls
}