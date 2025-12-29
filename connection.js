const { Client } = require("pg");

const client = new Client ({
    host: "localhost",
    user: "postgres",
    password: "whyfy",
    database: "URL-shortener",
    port: 5432
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
