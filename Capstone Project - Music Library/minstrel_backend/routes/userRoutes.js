const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/:id/liked", async (req, res) => {

    try {

        const user = await User
            .findById(req.params.id)
            .populate("likedSongs");

        res.json(user.likedSongs);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

module.exports = router;