const express = require("express");
const router = express.Router();

const {
    getTrending,
    getNewReleases,
    getArtists
} = require("../controllers/musicController");

router.get("/trending", getTrending);
router.get("/new-releases", getNewReleases);
router.get("/artists", getArtists);

module.exports = router;