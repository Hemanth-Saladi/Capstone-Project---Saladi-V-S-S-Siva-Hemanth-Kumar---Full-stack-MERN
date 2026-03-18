require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected");

    const sql = "INSERT INTO courses (name, duration) VALUES (?, ?)";
    connection.query(sql, ["Express Basics", "5 weeks"], (err, result) => {
        if (err) {
            console.error("Insert failed:", err);
            return;
        }

        console.log("INSERT INTO courses successful");
        connection.end();
    });
});