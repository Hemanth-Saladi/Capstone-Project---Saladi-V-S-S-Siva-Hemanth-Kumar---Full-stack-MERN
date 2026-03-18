import React, {useState} from "react";
import PropTypes from "prop-types";
import AuthorInfo from "./AuthorInfo";

function BookCard({title,author,price,image,authorBio,topBooks}) {

const [showAuthor,setShowAuthor] = useState(false);

return (

<div 
className="book-card"
onClick={()=>setShowAuthor(!showAuthor)}
>

<img src={image} alt={title} className="book-image"/>

<h5>{title}</h5>
<p>{author}</p>
<p className="price">₹{price}</p>

{showAuthor && (

<AuthorInfo
author={author}
bio={authorBio}
books={topBooks}
/>

)}

</div>

);

}

BookCard.propTypes = {

title:PropTypes.string.isRequired,
author:PropTypes.string.isRequired,
price:PropTypes.number.isRequired,
image:PropTypes.string.isRequired

};

export default BookCard;