const express = require("express");
const router = express.Router();

let books = [
    { id: 1, title: "1984", author: "Orwell" },
    { id: 2, title: "The Alchemist", author: "Coelho" }
];

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
});

router.post("/", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully", deletedBook });
});

module.exports = router;