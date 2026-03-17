const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const path = require("path");

const mm = require("music-metadata");



/*
ADD MULTIPLE ARTISTS
Admin can add many artists at once
*/
exports.addArtists = async (req, res) => {

  try {

    const { artists } = req.body;

    if (!artists || artists.length === 0) {

      return res.status(400).json({
        message: "No artists provided"
      });

    }

    const insertedArtists = await Artist.insertMany(artists);

    res.json({
      message: "Artists added successfully",
      artists: insertedArtists
    });

  }
  catch (error) {

    res.status(500).json({
      message: "Error adding artists"
    });

  }

};


/*
ADD SONG MANUALLY
*/
exports.uploadSong = async (req, res) => {

  try {

    const { title, artist, album } = req.body;

    let artistDoc = await Artist.findOne({ name: artist });

    if (!artistDoc) {
      artistDoc = await Artist.create({ name: artist });
    }

    let albumDoc = null;

    if (album) {

      albumDoc = await Album.findOne({ title: album });

      if (!albumDoc) {

        albumDoc = await Album.create({
          title: album,
          artists: [artistDoc._id]
        });

      }

    }

    const songs = [];

    for (const file of req.files) {

      const song = new Song({

        title,
        artists: [artistDoc._id],
        album: albumDoc?._id,
        audioUrl: file.path,
        coverUrl: "",
        duration: 0

      });

      await song.save();

      songs.push(song);

    }

    res.json({
      message: "Songs uploaded",
      songs
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Upload failed"
    });

  }

};



/*
SEARCH SYSTEM
Spotify-style search
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

    const songs = await Song.find({

      title: { $regex: query, $options: "i" }

    }).populate("artists");



    const artists = await Artist.find({

      name: { $regex: query, $options: "i" }

    });



    const albums = await Album.find({

      title: { $regex: query, $options: "i" }

    });



    res.json({

      songs,
      artists,
      albums

    });

  }
  catch (error) {

    res.status(500).json({
      message: "Search error"
    });

  }

};



/*
UPDATE SONG
*/
exports.updateSong = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedSong = await Song.findByIdAndUpdate(

      id,
      req.body,
      { new: true }

    );

    res.json({

      message: "Song updated",
      song: updatedSong

    });

  }
  catch (error) {

    res.status(500).json({
      message: "Update error"
    });

  }

};



/*
DELETE SONG
*/
exports.deleteSong = async (req, res) => {

  try {

    const { id } = req.params;

    await Song.findByIdAndDelete(id);

    res.json({

      message: "Song deleted successfully"

    });

  }
  catch (error) {

    res.status(500).json({
      message: "Delete error"
    });

  }

};



/*
UPLOAD MULTIPLE SONGS (MAX 15)
Extract metadata from mp3
Admin can verify before posting
*/
exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;

    if (!artist || !title || !req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Title, artist and at least one song file are required"
      });
    }

    let artistDoc = await Artist.findOne({ name: artist });

    if (!artistDoc) {
      artistDoc = await Artist.create({ name: artist });
    }

    let albumDoc = null;

    if (album && album.trim()) {
      albumDoc = await Album.findOne({ title: album });

      if (!albumDoc) {
        albumDoc = await Album.create({
          title: album,
          artists: [artistDoc._id]
        });
      }
    }

    const songs = [];

    for (const file of req.files) {
      const song = new Song({
        title: title || path.basename(file.originalname, path.extname(file.originalname)),
        artists: [artistDoc._id],
        album: albumDoc?._id || null,
        audioUrl: file.path.replace(/\\/g, "/"),
        coverUrl: "",
        duration: 0
      });

      await song.save();
      songs.push(song);
    }

    res.json({
      message: "Songs uploaded successfully",
      songs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Upload failed"
    });
  }
};

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

  }

  catch (error) {

    res.status(500).json({
      message: "Failed to load album"
    });

  }

};

exports.getAdminStats = async (req, res) => {

  try {

    const totalSongs = await Song.countDocuments();
    const totalArtists = await Artist.countDocuments();
    const totalAlbums = await Album.countDocuments();

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch admin stats"
    });

  }

};