require('dotenv').config();
const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Database is connected");
    } catch (error) {
        console.log("Database connection error", error);
    }
}

module.exports = {
    client,
    connectDB
}
