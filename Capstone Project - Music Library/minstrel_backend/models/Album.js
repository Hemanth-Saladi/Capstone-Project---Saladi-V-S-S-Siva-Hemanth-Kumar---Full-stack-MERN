const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    artists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    ],

    coverImage: {
        type: String
    },

    releaseYear: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Album", AlbumSchema);