import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorInfo from "../components/AuthorInfo";
import withLoading from "../hoc/withLoading";

function BookDetails({ isLoading }) {

  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));

  }, [id]);

  if (isLoading || !book) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="page">

      <div className="booklist-container">

        <div className="book-card" style={{ maxWidth: "600px", margin: "auto" }}>

          <img
            src={book.image}
            alt={book.title}
            className="book-image"
          />

          <h2 className="book-title">{book.title}</h2>

          <p
            className="book-author"
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setShowAuthor(!showAuthor)}
          >
            {book.author}
          </p>

          <p className="book-price">₹{book.price}</p>

          <p style={{ marginTop: "15px" }}>
            {book.description}
          </p>

          {showAuthor && (
            <AuthorInfo
              author={book.author}
              bio={book.authorBio}
              books={book.topBooks}
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default withLoading(BookDetails);