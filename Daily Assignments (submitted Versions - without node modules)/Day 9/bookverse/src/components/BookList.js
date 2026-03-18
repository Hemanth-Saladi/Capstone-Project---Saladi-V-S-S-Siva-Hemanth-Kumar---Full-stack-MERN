import React, { useState, useRef } from "react";
import BookCard from "./BookCard";

const booksData = [
  {
    id: 1,
    title: "Data Structures in C",
    author: "Reema Thareja",
    price: 450,
    authorId: 1,
    image: "https://m.media-amazon.com/images/I/61U+PeXZIwL.jpg",
    authorBio:
      "Reema Thareja is a renowned computer science author known for writing clear and practical textbooks on programming and data structures.",
    topBooks: ["Data Structures Using C", "Python Programming", "Programming in C"],
  },
  {
    id: 2,
    title: "Core Java Volume I",
    author: "Cay S. Horstmann",
    price: 550,
    authorId: 2,
    image: "https://m.media-amazon.com/images/I/61MFx7FNU3L._AC_UF1000,1000_QL80_.jpg",
    authorBio:
      "Cay S. Horstmann is a professor and bestselling programming author famous for his books on Java programming.",
    topBooks: ["Core Java Vol 1", "Core Java Vol 2", "Java Concepts"],
  },
  {
    id: 3,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    price: 650,
    authorId: 3,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/book/m/o/q/computer-networks-original-imahb95vs3azqyn6.jpeg?q=90",
    authorBio:
      "Andrew S. Tanenbaum is a computer science professor known for his textbooks on networking and operating systems.",
    topBooks: [
      "Computer Networks",
      "Modern Operating Systems",
      "Structured Computer Organization",
    ],
  },
];

function BookList() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const searchRef = useRef();

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="booklist-container">
      <div className="controls">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />

        <div className="view-buttons">
          <button
            className={view === "grid" ? "btn btn-primary active" : "btn btn-outline-primary"}
            onClick={() => setView("grid")}
          >
            Grid View
          </button>

          <button
            className="btn btn-success"
            onClick={() => searchRef.current.focus()}
          >
            Focus Search
          </button>

          <button
            className={view === "list" ? "btn btn-primary active" : "btn btn-outline-primary"}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={view === "grid" ? "grid-container" : "list-container"}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            image={book.image}
            authorBio={book.authorBio}
            topBooks={book.topBooks}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;