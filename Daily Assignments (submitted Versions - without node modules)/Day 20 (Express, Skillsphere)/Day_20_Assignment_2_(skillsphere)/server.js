const express = require("express");
const app = express();
const courseRoutes = require("./routes/courses");

app.use(express.json());
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to SkillSphere LMS API");
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});