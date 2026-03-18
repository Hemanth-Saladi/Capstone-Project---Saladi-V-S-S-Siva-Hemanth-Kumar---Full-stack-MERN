import React, { useState } from "react";
import BookCard from "./BookCard";

// Updated books for B.Tech students
const booksData = [
  {
    id: 1,
    title: "Data Structures in C",
    author: "Reema Thareja",
    price: 450,
    image: "https://m.media-amazon.com/images/I/61U+PeXZIwL.jpg",
  },
  {
    id: 2,
    title: "Core Java Volume I",
    author: "Cay S. Horstmann",
    price: 550,
    image: "https://m.media-amazon.com/images/I/61MFx7FNU3L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 3,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    price: 650,
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/book/m/o/q/computer-networks-original-imahb95vs3azqyn6.jpeg?q=90",
  },
  {
    id: 4,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    price: 700,
    image: "https://m.media-amazon.com/images/I/81z6V7RHmNL.jpg",
  },
];

function BookList() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="booklist-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <div className="view-buttons">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className={view === "list" ? "active" : ""}
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
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;