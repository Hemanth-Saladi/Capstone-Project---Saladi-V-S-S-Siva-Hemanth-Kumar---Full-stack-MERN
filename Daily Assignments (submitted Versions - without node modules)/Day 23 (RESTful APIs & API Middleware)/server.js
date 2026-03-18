const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many requests" }
});

app.use("/api/v1/", limiter);

let courses = [
  { id: 1, name: "React Mastery", duration: "6 weeks" },
  { id: 2, name: "Node.js Basics", duration: "4 weeks" }
];

app.get("/api/v1/courses", (req, res) => {
  res.json(courses);
});

app.post(
  "/api/v1/courses",
  [
    body("name").notEmpty().withMessage("Course name is required"),
    body("duration").notEmpty().withMessage("Course duration is required")
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const newCourse = {
      id: courses.length + 1,
      name: req.body.name,
      duration: req.body.duration
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
  }
);

app.put("/api/v1/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  course.name = req.body.name || course.name;
  course.duration = req.body.duration || course.duration;

  res.json(course);
});

app.delete("/api/v1/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  courses = courses.filter(c => c.id !== id);
  res.json({ message: "Course deleted successfully" });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});