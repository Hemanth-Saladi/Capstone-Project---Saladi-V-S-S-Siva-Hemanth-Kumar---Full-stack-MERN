import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../components/BookList";
import UserGreeting from "../components/UserGreeting";

function Home() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/books")
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));

    }, []);

    return (

        <div className="page">

            <UserGreeting
                render={(name) => (
                    <h2 style={{ marginBottom: "20px" }}>Welcome {name} to BookVerse</h2>
                )}
            />

            <BookList booksData={books} />

        </div>
    );
}

export default Home;