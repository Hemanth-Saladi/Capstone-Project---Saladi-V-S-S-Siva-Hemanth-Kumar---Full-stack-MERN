const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const User = require("../models/User");
const path = require("path");
const mm = require("music-metadata");

/*
ADD MULTIPLE ARTISTS
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding artists"
    });
  }
};

/*
UPLOAD SONGS
*/
exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;

    if (!artist || !req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Artist and at least one song file are required"
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
      let duration = 0;

      try {
        const metadata = await mm.parseFile(file.path);
        duration = Math.floor(metadata.format.duration || 0);
      } catch {
        duration = 0;
      }

      const generatedTitle =
        title && title.trim()
          ? title
          : path.basename(file.originalname, path.extname(file.originalname));

      const song = new Song({
        title: generatedTitle,
        artists: [artistDoc._id],
        album: albumDoc?._id || null,
        audioUrl: file.path.replace(/\\/g, "/"),
        coverUrl: "",
        duration
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

/*
SEARCH
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
  } catch (error) {
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

    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.json({
      message: "Song updated",
      song: updatedSong
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({
      message: "Delete error"
    });
  }
};

/*
DELETE ARTIST
*/
exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    await Artist.findByIdAndDelete(id);

    res.json({
      message: "Artist deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Artist delete error"
    });
  }
};

/*
ADMIN STATS
*/
exports.getAdminStats = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: "Failed to load stats" });
  }
};