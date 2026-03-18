import React, { useState, useRef } from "react";
import BookCard from "./BookCard";

function BookList({booksData}) {

const [view,setView] = useState("grid");
const [search,setSearch] = useState("");

const searchRef = useRef();

const filteredBooks = booksData.filter((book)=>
book.title.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="booklist-container">

<div className="controls">

<input
ref={searchRef}
type="text"
placeholder="Search books..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-box"
/>

<div className="view-buttons">

<button
className={view==="grid" ? "active":""}
onClick={()=>setView("grid")}
>
Grid View
</button>

<button
className="btn btn-success"
onClick={()=>searchRef.current.focus()}
>
Focus Search
</button>

<button
className={view==="list" ? "active":""}
onClick={()=>setView("list")}
>
List View
</button>

</div>

</div>

<div className={view==="grid" ? "grid-container":"list-container"}>

{filteredBooks.map((book)=>(
<BookCard key={book.id} book={book}/>
))}

</div>

</div>

);

}

export default BookList;