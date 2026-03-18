const db = connect("mongodb://127.0.0.1:27017/BookVerseDB");

db.Books.find({ genre: "Fantasy" }).explain("executionStats");
db.Books.find({ authorId: 1 }).explain("executionStats");
db.Books.find({ "ratings.score": { $gte: 4 } }).explain("executionStats");

db.Books.createIndex({ genre: 1 });
db.Books.createIndex({ authorId: 1 });
db.Books.createIndex({ "ratings.score": 1 });

db.Books.find({ genre: "Fantasy" }).explain("executionStats");
db.Books.find({ authorId: 1 }).explain("executionStats");
db.Books.find({ "ratings.score": { $gte: 4 } }).explain("executionStats");

db.Books.dropIndex("ratings.score_1");

db.Books.find({ "ratings.score": { $gte: 4 } }).explain("executionStats");

print("Average rating per book");
printjson(
    db.Books.aggregate([
        { $unwind: "$ratings" },
        { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } },
        { $sort: { avgRating: -1 } }
    ]).toArray()
);

print("Top 3 highest rated books");
printjson(
    db.Books.aggregate([
        { $unwind: "$ratings" },
        { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } },
        { $sort: { avgRating: -1 } },
        { $limit: 3 }
    ]).toArray()
);

print("Number of books per genre");
printjson(
    db.Books.aggregate([
        { $group: { _id: "$genre", totalBooks: { $sum: 1 } } },
        { $sort: { totalBooks: -1 } }
    ]).toArray()
);

print("Authors with more than 2 books");
printjson(
    db.Books.aggregate([
        { $group: { _id: "$authorId", bookCount: { $sum: 1 } } },
        { $match: { bookCount: { $gt: 2 } } }
    ]).toArray()
);

print("Total reward points per author");
printjson(
    db.Books.aggregate([
        { $unwind: "$ratings" },
        { $group: { _id: "$authorId", totalPoints: { $sum: "$ratings.score" } } },
        { $sort: { totalPoints: -1 } }
    ]).toArray()
);

db.Books.createIndex({ genre: 1, publicationYear: -1 });

db.Books.find({ genre: "Fantasy" }).sort({ publicationYear: -1 }).explain("executionStats");

print("Top rated author by average score");
printjson(
    db.Books.aggregate([
        { $unwind: "$ratings" },
        { $group: { _id: "$authorId", avgScore: { $avg: "$ratings.score" } } },
        { $sort: { avgScore: -1 } },
        { $limit: 1 }
    ]).toArray()
);