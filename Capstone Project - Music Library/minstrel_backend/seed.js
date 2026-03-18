const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Song = require("./models/Song");

connectDB();

const seedData = async () => {

    try {

        await Artist.deleteMany();
        await Album.deleteMany();
        await Song.deleteMany();

        console.log("Old data cleared");

        const artists = await Artist.insertMany([
            { name: "Arijit Singh" },
            { name: "Anirudh Ravichander" },
            { name: "Sid Sriram" },
            { name: "A.R Rahman" }
        ]);

        const albums = await Album.insertMany([
            { title: "Love Hits" },
            { title: "Tamil Beats" },
            { title: "Chill Nights" }
        ]);

        const songs = [

            {
                title: "Kesariya",
                artists: [artists[0]._id],
                album: albums[0]._id,
                duration: 240,
                audioUrl: "/uploads/audio/test.mp3",
                coverUrl: "/uploads/covers/test.jpg"
            },

            {
                title: "Why This Kolaveri",
                artists: [artists[1]._id],
                album: albums[1]._id,
                duration: 210,
                audioUrl: "/uploads/audio/test.mp3",
                coverUrl: "/uploads/covers/test.jpg"
            },

            {
                title: "Adiye",
                artists: [artists[2]._id],
                album: albums[2]._id,
                duration: 230,
                audioUrl: "/uploads/audio/test.mp3",
                coverUrl: "/uploads/covers/test.jpg"
            }

        ];

        await Song.insertMany(songs);

        console.log("Database seeded successfully");

        process.exit();

    } catch (error) {

        console.error(error);
        process.exit(1);

    }

};

seedData();