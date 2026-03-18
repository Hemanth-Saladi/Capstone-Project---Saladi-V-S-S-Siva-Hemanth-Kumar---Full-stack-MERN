import dispatcher from "./Dispatcher";
import axios from "axios";

export function addBook(book){

axios.post("http://localhost:5000/books",book)
.then(res=>{

dispatcher.dispatch({
type:"ADD_BOOK",
payload:res.data
});

})
.catch(err=>console.log(err));

}