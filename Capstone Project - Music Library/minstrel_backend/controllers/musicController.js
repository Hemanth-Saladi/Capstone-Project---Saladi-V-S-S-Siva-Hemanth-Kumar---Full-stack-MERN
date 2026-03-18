const Song = require("../models/Song");
const Artist = require("../models/Artist");

exports.getTrending = async (req, res) => {
    const songs = await Song.find().sort({ playCount: -1 }).limit(10);
    res.json(songs);
};

exports.getNewReleases = async (req, res) => {
    const songs = await Song.find().sort({ createdAt: -1 }).limit(10);
    res.json(songs);
};

exports.getArtists = async (req, res) => {
    const artists = await Artist.find().limit(20);
    res.json(artists);
};