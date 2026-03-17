const express = require("express");
const router = express.Router();

const {
    createPlaylist,
    addSongToPlaylist,
    removeSong,
    getUserPlaylists,
    getPlaylist
} = require("../controllers/playlistController");


router.post("/create", createPlaylist);

router.post("/add-song", addSongToPlaylist);

router.post("/remove-song", removeSong);

router.get("/user/:userId", getUserPlaylists);

router.get("/:id", getPlaylist);

module.exports = router;