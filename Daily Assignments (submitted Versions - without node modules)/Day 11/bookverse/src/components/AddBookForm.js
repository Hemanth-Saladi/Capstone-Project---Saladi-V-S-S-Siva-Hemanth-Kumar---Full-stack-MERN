import React from "react";
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";
import {addBook} from "../flux/Actions";

function AddBookForm(){

const validationSchema=Yup.object({
title:Yup.string().required("Title is required"),
author:Yup.string().required("Author is required"),
price:Yup.number().required("Price is required")
});

return(

<div className="booklist-container">

<h2 style={{marginBottom:"20px"}}>Add New Book</h2>

<Formik
initialValues={{
title:"",
author:"",
price:"",
image:"",
description:"",
authorBio:"",
topBooks:""
}}

validationSchema={validationSchema}

onSubmit={(values,{resetForm})=>{

const newBook={
id:Date.now().toString(),
title:values.title,
author:values.author,
price:Number(values.price),
image:values.image || "https://via.placeholder.com/150",
description:values.description,
authorBio:values.authorBio,
topBooks:values.topBooks
? values.topBooks.split(",").map(b=>b.trim())
: []
};

addBook(newBook);
resetForm();

}}

>

<Form>

<Field name="title" placeholder="Book Title" className="search-box"/>
<ErrorMessage name="title" component="div"/>

<Field name="author" placeholder="Author Name" className="search-box"/>
<ErrorMessage name="author" component="div"/>

<Field name="price" placeholder="Price" className="search-box"/>
<ErrorMessage name="price" component="div"/>

<Field name="image" placeholder="Book Image URL" className="search-box"/>

<Field name="description" placeholder="Book Description" className="search-box"/>

<Field name="authorBio" placeholder="Author Bio" className="search-box"/>

<Field name="topBooks" placeholder="Top Books (comma separated)" className="search-box"/>

<button type="submit" className="btn btn-primary">Add Book</button>

</Form>

</Formik>

</div>

);

}

export default AddBookForm;