import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorInfo from "./AuthorInfo";

function BookCard({ book }) {

    const [showAuthor, setShowAuthor] = useState(false);

    return (

        <div className="book-card">

            <Link to={`/book/${book.id}`} className="book-link">
                <img src={book.image} alt={book.title} className="book-image" />
                <h5 className="book-title">{book.title}</h5>
                <p className="book-author">{book.author}</p>
                <p className="book-price">₹{book.price}</p>
            </Link>

            <div onClick={() => setShowAuthor(!showAuthor)}>
                {showAuthor && (
                    <AuthorInfo
                        author={book.author}
                        bio={book.authorBio}
                        books={book.topBooks}
                    />
                )}
            </div>
        </div>
    );
}

export default BookCard;