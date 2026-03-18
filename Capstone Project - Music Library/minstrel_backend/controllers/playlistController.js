const Playlist = require("../models/Playlist");
const User = require("../models/User");


// CREATE PLAYLIST

exports.createPlaylist = async (req, res) => {

    try {

        const { name, userId } = req.body;

        const playlist = new Playlist({
            name,
            user: userId
        });

        await playlist.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { playlists: playlist._id } }
        );

        res.json(playlist);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// ADD SONG TO PLAYLIST

exports.addSongToPlaylist = async (req, res) => {

    try {

        const { playlistId, songId } = req.body;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
        }

        await playlist.save();

        res.json({ message: "Song added to playlist" });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// REMOVE SONG FROM PLAYLIST

exports.removeSong = async (req, res) => {

    try {

        const { playlistId, songId } = req.body;

        const playlist = await Playlist.findById(playlistId);

        playlist.songs = playlist.songs.filter(
            id => id.toString() !== songId
        );

        await playlist.save();

        res.json({ message: "Song removed from playlist" });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// GET USER PLAYLISTS

exports.getUserPlaylists = async (req, res) => {

    try {

        const playlists = await Playlist
            .find({ user: req.params.userId })
            .populate("songs");

        res.json(playlists);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



// GET SINGLE PLAYLIST

exports.getPlaylist = async (req, res) => {

    try {

        const playlist = await Playlist
            .findById(req.params.id)
            .populate("songs");

        res.json(playlist);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};