const { client } = require("../connection");

async function createShortURL(short_id, redirect_url, user_id) {
    const query = `
    INSERT INTO urls (short_id, redirect_url, created_by)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
    const values = [short_id, redirect_url, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
}

async function getRedirectURL(short_id) {
    const query = `
    SELECT redirect_url FROM urls
    WHERE short_id = $1
    `;
    const result = await client.query(query, [short_id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
};

async function logVisit(short_id) {
    const query = `
    UPDATE urls
    SET visit_history = visit_history || $1
    WHERE short_id = $2
    `;
    const newVisit = JSON.stringify([{ timestamp: Date.now() }]);
    await client.query(query, [newVisit, short_id]);
}

async function viewAnalytics(short_id) {
    const query = `
    SELECT visit_history FROM urls
    WHERE short_id = $1
    `;
    const result = await client.query(query, [short_id]);
    if(result.rows.length == 0) return null;
    return result.rows[0];
}

async function getUserUrls(user_id) {
    const query = `
    SELECT * FROM urls
    WHERE created_by = $1
    `;
    const result = await client.query(query, [user_id]);
    return result.rows; 
}

module.exports = {
    createShortURL,
    getRedirectURL,
    logVisit,
    viewAnalytics,
    getUserUrls
}