const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  addArtists,
  uploadSong,
  search,
  updateSong,
  deleteSong,
  deleteArtist,
  getAdminStats
} = require("../controllers/adminController");

router.post("/artists", addArtists);

router.post("/upload-song", upload.array("songs", 15), uploadSong);

router.get("/search", search);

router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);

router.delete("/artists/:id", deleteArtist);

router.get("/stats", getAdminStats);

module.exports = router;