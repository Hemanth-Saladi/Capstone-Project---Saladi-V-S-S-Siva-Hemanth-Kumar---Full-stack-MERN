const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const User = require("../models/User");



/*
=========================================
RANDOM SONG MIX
Used for Home page "Your Mix"
=========================================
*/

exports.getRandomSongs = async (req, res) => {

  try {

    const songs = await Song.aggregate([
      { $sample: { size: 10 } }
    ]);

    res.json(songs);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error loading random songs"
    });

  }

};



/*
=========================================
NEW RELEASES
Home Page Section
=========================================
*/

exports.getNewestSongs = async (req, res) => {

  try {

    const songs = await Song
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("artists")
      .populate("album");

    res.json(songs);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error loading newest songs"
    });

  }

};



/*
=========================================
TRENDING / MOST PLAYED
Home Page Section
=========================================
*/

exports.getMostPlayedSongs = async (req, res) => {

  try {

    const songs = await Song
      .find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate("artists")
      .populate("album");

    res.json(songs);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error loading popular songs"
    });

  }

};



/*
=========================================
SPOTIFY STYLE GLOBAL SEARCH
Search Songs + Artists + Albums
=========================================
*/

exports.search = async (req, res) => {

  try {

    const query = req.query.q;

    if (!query) {

      return res.json({
        songs: [],
        artists: [],
        albums: []
      });

    }



    const songs = await Song
      .find({
        title: { $regex: query, $options: "i" }
      })
      .limit(10)
      .populate("artists")
      .populate("album");



    const artists = await Artist
      .find({
        name: { $regex: query, $options: "i" }
      })
      .limit(10);



    const albums = await Album
      .find({
        title: { $regex: query, $options: "i" }
      })
      .limit(10);



    res.json({
      songs,
      artists,
      albums
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Search error"
    });

  }

};



/*
=========================================
INCREASE PLAY COUNT
Called when song starts playing
=========================================
*/

exports.incrementPlayCount = async (req, res) => {

  try {

    const { id } = req.params;

    const song = await Song.findByIdAndUpdate(

      id,

      { $inc: { playCount: 1 } },

      { new: true }

    );

    if (!song) {

      return res.status(404).json({
        message: "Song not found"
      });

    }

    res.json({
      message: "Play count updated",
      song
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Play count update failed"
    });

  }

};



/*
=========================================
LIKE / UNLIKE SONG
=========================================
*/

exports.likeSong = async (req, res) => {

  try {

    const { userId, songId } = req.body;

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }



    const alreadyLiked = user.likedSongs.includes(songId);



    if (alreadyLiked) {

      user.likedSongs = user.likedSongs.filter(
        id => id.toString() !== songId
      );

      await user.save();

      return res.json({
        message: "Song unliked"
      });

    }



    user.likedSongs.push(songId);

    await user.save();

    res.json({
      message: "Song liked successfully"
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Like action failed"
    });

  }

};

exports.getAllSongs = async (req, res) => {

  try {

    const songs = await Song
      .find()
      .populate("artists")
      .populate("album");

    res.json(songs);

  }

  catch (error) {

    res.status(500).json({
      message: "Failed to load songs"
    });

  }

};