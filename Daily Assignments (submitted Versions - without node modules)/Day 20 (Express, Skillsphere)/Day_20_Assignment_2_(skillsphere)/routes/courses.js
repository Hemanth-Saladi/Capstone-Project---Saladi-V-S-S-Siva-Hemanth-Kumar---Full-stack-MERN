const express = require("express");
const router = express.Router();

function validateCourseId(req, res, next) {
    const courseId = req.params.id;

    if (!/^\d+$/.test(courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
    }

    next();
}

router.get("/:id", validateCourseId, (req, res) => {
    const courseId = req.params.id;

    res.json({
        id: courseId,
        name: "React Mastery",
        duration: "6 weeks"
    });
});

module.exports = router;