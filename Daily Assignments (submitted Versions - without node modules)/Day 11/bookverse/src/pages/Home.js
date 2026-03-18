import React,{useEffect,useState,useRef} from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import bookStore from "../flux/BookStore";

function Home(){

const [books,setBooks]=useState([]);
const [view,setView]=useState("grid");
const [search,setSearch]=useState("");

const searchRef=useRef();

useEffect(()=>{

axios.get("http://localhost:5000/books")
.then(res=>setBooks(res.data))
.catch(err=>console.log(err));

const handleChange=()=>{
setBooks(prevBooks=>[...prevBooks,...bookStore.getBooks()]);
};

bookStore.on("change",handleChange);

return()=>{
bookStore.removeListener("change",handleChange);
};

},[]);

const filteredBooks=books.filter(book=>
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
className={view==="grid"?"active":""}
onClick={()=>setView("grid")}
>
Grid View
</button>

<button
onClick={()=>searchRef.current.focus()}
>
Focus Search
</button>

<button
className={view==="list"?"active":""}
onClick={()=>setView("list")}
>
List View
</button>

</div>

</div>

<div className={view==="grid"?"grid-container":"list-container"}>

{filteredBooks.map(book=>(
<BookCard key={book.id} book={book}/>
))}

</div>

</div>

);

}

export default Home;