const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    bio: {
        type: String
    },

    image: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Artist", ArtistSchema);