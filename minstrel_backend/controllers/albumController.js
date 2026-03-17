const Song = require("../models/Song");
const Album = require("../models/Album");

exports.getAlbum = async (req, res) => {

    try {

        const { id } = req.params;

        const album = await Album.findById(id);

        const songs = await Song
            .find({ album: id })
            .populate("artists")
            .populate("album");

        res.json({
            album,
            songs
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to load album"
        });

    }

};