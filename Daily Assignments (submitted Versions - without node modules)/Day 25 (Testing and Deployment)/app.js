const express = require("express");
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: "React Mastery", duration: "6 weeks" }
];

let users = [
    { id: 1, name: "John Doe" }
];

app.get("/api/courses", (req, res) => {
    res.json(courses);
});

app.post("/api/courses", (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
        duration: req.body.duration
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/status", (req, res) => {
    res.send("App is live");
});

module.exports = app;