import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

class AuthorInfo extends Component {

  componentDidMount() {
    console.log("Author Info Loaded");
  }

  render() {

    const { author, bio, books } = this.props;

    return (
      <Card className="author-popup shadow">
        <Card.Body>

          <h4>{author}</h4>

          <p>{bio}</p>

          <h6>Books from Same Author</h6>

          <div className="author-books">
            {books && books.map((b, i) => (
              <div key={i} className="mini-book">
                {b}
              </div>
            ))}
          </div>

        </Card.Body>
      </Card>
    );
  }
}

AuthorInfo.propTypes = {
  author: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  books: PropTypes.array
};

export default AuthorInfo;