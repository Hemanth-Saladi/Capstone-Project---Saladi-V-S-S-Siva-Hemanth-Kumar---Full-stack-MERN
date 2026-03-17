const Song = require("../models/Song");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

exports.getStats = async (req, res) => {

    try {

        const totalSongs = await Song.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalArtists = await Artist.countDocuments();
        const totalAlbums = await Album.countDocuments();

        const plays = await Song.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$playCount" }
                }
            }
        ]);

        res.json({
            totalSongs,
            totalUsers,
            totalArtists,
            totalAlbums,
            totalPlays: plays[0]?.total || 0
        });

    } catch (error) {

        res.status(500).json({ message: "Failed to load stats" });

    }

};