import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBookForm from "./components/AddBookForm";
import "./App.css";

function App(){

return(

<Router>

<div className="App">

<h1>BookVerse</h1>

<nav>
<Link to="/">Home</Link> | 
<Link to="/add">Add Book</Link>
</nav>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/book/:id" element={<BookDetails/>}/>
<Route path="/add" element={<AddBookForm/>}/>

</Routes>

</div>

</Router>

);

}

export default App;