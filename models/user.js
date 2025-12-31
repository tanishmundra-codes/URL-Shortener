const { client } = require("../connection");

async function createUser(username, email, password) {
    const query = `
    INSERT INTO users
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const values = [username, email, password];

    const result = await client.query(query, values);
    return result.rows[0];
}

async function getUserByEmail(email) {
    const query = `
        SELECT * FROM users 
        WHERE email = $1
    `;
    
    const result = await client.query(query, [email]);
    
    return result.rows[0];
}

module.exports = {
    createUser,
    getUserByEmail
}