const { client } = require("../connection");

async function createShortURL(short_id, redirect_url) {
    const query = `
    INSERT INTO url
    VALUES ($1, $2)
    RETURNING *
    `;
    
    const values = [short_id, redirect_url];

    const result = await client.query(query, values);
    return result.rows[0];
}

module.exports = {
    createShortURL
}