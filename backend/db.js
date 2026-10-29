const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((error) => {
    if (error) {
        console.error("MySQL connection failed!");
        console.error("Error details:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        return;
    }

    console.log("GramCraft connected to MySQL successfully!");
});

module.exports = connection;
