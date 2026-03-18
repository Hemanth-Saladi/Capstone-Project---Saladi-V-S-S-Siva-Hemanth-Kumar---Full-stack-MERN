const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true
    }
  ],

  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    default: null
  },

  duration: {
    type: Number,
    required: true
  },

  audioUrl: {
    type: String
  },

  coverUrl: {
    type: String
  },

  playCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Song", SongSchema);
