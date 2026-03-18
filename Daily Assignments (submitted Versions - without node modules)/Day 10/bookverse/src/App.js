import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {

  return (

    <BrowserRouter>
      <div className="App">
        <h1>BookVerse</h1>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;