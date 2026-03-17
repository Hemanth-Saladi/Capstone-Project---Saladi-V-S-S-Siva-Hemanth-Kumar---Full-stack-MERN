const express = require("express");

const router = express.Router();

const { getAlbum } = require("../controllers/albumController");

router.get("/:id", getAlbum);

module.exports = router;