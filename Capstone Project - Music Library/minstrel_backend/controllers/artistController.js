const Artist = require("../models/Artist");
const Song = require("../models/Song");

exports.getArtist = async (req, res) => {

  try {

    const { id } = req.params;

    const artist = await Artist.findById(id);

    const songs = await Song
      .find({ artists: id })
      .populate("artists")
      .populate("album");

    res.json({
      artist,
      songs
    });

  }

  catch (error) {

    res.status(500).json({
      message: "Failed to load artist"
    });

  }

};