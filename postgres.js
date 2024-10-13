const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectPostgres = async () => {
    try {
        await pool.connect();
        console.log("Connected to PostgreSQL");

        // Create the 'users' table if it doesn't exist
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            age INTEGER
        );
        `;

        await pool.query(createTableQuery);
        console.log('User table created or already exists.');
    } catch (error) {
        console.error("Failed to connect to PostgreSQL", error);
        throw error;
    }
};

module.exports = { pool, connectPostgres };
