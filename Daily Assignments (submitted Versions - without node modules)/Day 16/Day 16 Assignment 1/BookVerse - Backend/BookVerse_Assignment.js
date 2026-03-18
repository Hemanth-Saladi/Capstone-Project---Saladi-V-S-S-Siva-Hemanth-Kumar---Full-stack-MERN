const db = connect("mongodb://127.0.0.1:27017/BookVerseDB");

db.Authors.drop();
db.Books.drop();
db.Users.drop();

db.Authors.insertMany([
  { _id: 1, name: "J.K. Rowling", nationality: "British", birthYear: 1965 },
  { _id: 2, name: "Isaac Asimov", nationality: "American", birthYear: 1920 },
  { _id: 3, name: "George R.R. Martin", nationality: "American", birthYear: 1948 }
]);

db.Users.insertMany([
  { _id: 1, name: "Alice Smith", email: "alice@example.com", joinDate: new Date("2023-01-15") },
  { _id: 2, name: "Bob Johnson", email: "bob@example.com", joinDate: new Date("2023-09-01") },
  { _id: 3, name: "Carol Lee", email: "carol@example.com", joinDate: new Date("2023-06-20") }
]);

db.Books.insertMany([
  { _id: 1, title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", publicationYear: 1997, authorId: 1, ratings: [ { user: 1, score: 5, comment: "Magical!" }, { user: 2, score: 4, comment: "Great read" } ] },
  { _id: 2, title: "Foundation", genre: "Science Fiction", publicationYear: 1951, authorId: 2, ratings: [ { user: 1, score: 4, comment: "Fascinating" } ] },
  { _id: 3, title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996, authorId: 3, ratings: [ { user: 3, score: 5, comment: "Epic!" }, { user: 2, score: 5, comment: "Loved it" } ] },
  { _id: 4, title: "Harry Potter and the Chamber of Secrets", genre: "Fantasy", publicationYear: 1998, authorId: 1, ratings: [ { user: 1, score: 5, comment: "Better than first" } ] },
  { _id: 5, title: "I, Robot", genre: "Science Fiction", publicationYear: 1950, authorId: 2, ratings: [ { user: 3, score: 4, comment: "Classic" } ] }
]);

db.Users.insertOne({ _id: 4, name: "David Miller", email: "david@example.com", joinDate: new Date("2023-11-01") });

db.Books.insertOne({ _id: 6, title: "The Winds of Winter", genre: "Fantasy", publicationYear: 2024, authorId: 3, ratings: [] });

const sciFiBooks = db.Books.find({ genre: "Science Fiction" }).toArray();
print("Science Fiction Books:");
printjson(sciFiBooks);

db.Books.updateOne({ _id: 6 }, { $set: { publicationYear: 2025 } });

db.Users.deleteOne({ _id: 2 });

db.Books.updateOne({ _id: 2 }, { $push: { ratings: { user: 4, score: 5, comment: "Amazing Sci-Fi!" } } });

const booksAfter2015 = db.Books.find({ publicationYear: { $gt: 2015 } }).toArray();
print("Books Published After 2015:");
printjson(booksAfter2015);

const fantasyAuthors = db.Authors.find({ _id: { $in: db.Books.find({ genre: "Fantasy" }).map(b => b.authorId).toArray() } }).toArray();
print("Authors with Fantasy Books:");
printjson(fantasyAuthors);

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const recentUsers = db.Users.find({ joinDate: { $gte: sixMonthsAgo } }).toArray();
print("Users Joined Last 6 Months:");
printjson(recentUsers);

const highRatedBooks = db.Books.aggregate([
  { $addFields: { avgRating: { $avg: "$ratings.score" } } },
  { $match: { avgRating: { $gt: 4 } } }
]).toArray();
print("Books with Avg Rating > 4:");
printjson(highRatedBooks);

const top3RatedBooks = db.Books.aggregate([
  { $addFields: { ratingCount: { $size: "$ratings" } } },
  { $sort: { ratingCount: -1 } },
  { $limit: 3 }
]).toArray();
print("Top 3 Most Rated Books:");
printjson(top3RatedBooks);