This assignment implements a MongoDB database for BookVerse, a digital platform managing books, authors, users, and reviews.

It demonstrates:
    NoSQL data modeling
    CRUD operations
    Query filtering and aggregation
    References (authorId) and embedded documents (ratings)
    Entries of Top 3 most-rated books 


Prerequisites:
    MongoDB Server installed and running locally (localhost:27017)
    MongoDB Compass (optional, to visually verify collections)
    mongosh shell installed
    VS Code for editing and running scripts
    PowerShell (or any terminal) on Windows

BookVerse_Assignment.js – Contains all database setup, inserts, CRUD operations, queries, and bonus challenge.

Steps to Run:
    1. Open VS Code and navigate to the assignment folder
    2. Open PowerShell and start mongosh using comand - "mongosh"
    3. Load the assignment script in mongosh using "load("BookVerse_Assignment.js")"
    
The script will:
    Create BookVerseDB
    Create collections: Authors, Books, Users
    Insert sample data
    Perform CRUD operations
    Run queries and filters
    Display top 3 most-rated books (bonus)

Check the output in PowerShell directly. You should see JSON results for all queries.

Open MongoDB Compass:
    Connect to localhost:27017
    Verify BookVerseDB and collections
    Browse documents in each collection
    
Key MongoDB Commands in Script:
    Insert multiple documents: insertMany()
    Insert single document: insertOne()
    Update document: updateOne(), $set, $push
    Delete document: deleteOne()
    Filter documents: find(), $gt, $gte
    Aggregate queries: aggregate(), $avg, $size, $sort, $limit
    Drop collections: drop()