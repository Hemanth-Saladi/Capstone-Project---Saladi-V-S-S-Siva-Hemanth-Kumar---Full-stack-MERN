const express = require("express");

const router = express.Router();

const {
  getRandomSongs,
  getNewestSongs,
  getMostPlayedSongs,
  search,
  incrementPlayCount,
  getAllSongs,
  likeSong
} = require("../controllers/songController");


/*
HOME PAGE SECTIONS
*/

router.get("/random", getRandomSongs);

router.get("/newest", getNewestSongs);

router.get("/mostplayed", getMostPlayedSongs);


/*
SEARCH
*/

router.get("/search", search);


/*
SONG PLAY
*/

router.post("/play/:id", incrementPlayCount);


/*
GET ALL SONGS
*/

router.get("/", getAllSongs);


/*
LIKE SONG
*/

router.post("/like", likeSong);


module.exports = router;