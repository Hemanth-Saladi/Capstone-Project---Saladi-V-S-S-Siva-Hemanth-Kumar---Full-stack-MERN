import {EventEmitter} from "events";
import dispatcher from "./Dispatcher";

class BookStore extends EventEmitter{

books=[];

getBooks(){
return this.books;
}

handleActions(action){

switch(action.type){

case "ADD_BOOK":
this.books=[...this.books,action.payload];
this.emit("change");
break;

default:
break;

}

}

}

const bookStore=new BookStore();
dispatcher.register(bookStore.handleActions.bind(bookStore));

export default bookStore;