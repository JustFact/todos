import { createTodoItem } from "./todo.js";
import { createNote } from "./note.js";
import { createBucket } from "./bucket.js";

//temporary code to check functionality
let myBucket = createBucket("myBucket");
let myTodo = createTodoItem("myTodo", "test", "Jan,01", "1");
let myNote = createNote("myNote", "test");
myBucket.addToBucket(myTodo);
myBucket.addToBucket(myNote);
myBucket.addToBucket("This won't be added");
// myBucket.deleteFromBucket(0, myNote);
console.log(myBucket.getBucket());
