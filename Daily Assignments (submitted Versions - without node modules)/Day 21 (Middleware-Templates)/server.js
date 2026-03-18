const express = require("express");
const app = express();

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${req.method}] ${req.url} at ${timestamp}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.send("Welcome to SkillSphere LMS API");
});

app.post("/users", (req, res) => {
    res.json({
        message: "User created successfully",
        data: req.body
    });
});

app.get("/courses", (req, res) => {
    const courses = ["React Mastery", "Node.js Basics", "MongoDB Essentials"];
    res.render("courses", { courses });
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});