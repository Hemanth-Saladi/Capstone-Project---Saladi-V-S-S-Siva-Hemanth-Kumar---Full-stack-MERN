import React from "react";

function BookCard({ title, author, price, image }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-image" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">By: {author}</p>
      <p className="book-price">₹ {price}</p>
    </div>
  );
}

export default BookCard;