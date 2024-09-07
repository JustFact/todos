import { todoSymbol, createTodoItem } from "./todo.js";
import { noteSymbol, createNote } from "./note.js";

function findInstanceOf(element) {
  //this will determine whether the element passed is
  //a todo item, note,
  if (element[todoSymbol]) {
    return "todo";
  } else if (element[noteSymbol]) {
    return "note";
  }
}

function createBucket(title) {
  const todo = [];
  const note = [];
  const bucket = [todo, note];

  //element could be a todo List, notes or checklist
  const addToBucket = (element) => {
    switch (findInstanceOf(element)) {
      case "todo":
        bucket[0].push(element);
        break;
      case "note":
        bucket[1].push(element);
        break;
    }
  };

  const deleteFromBucket = (index, element) => {
    switch (findInstanceOf(element)) {
      case "todo":
        bucket[0].splice(index, 1);
        break;
      case "note":
        bucket[1].splice(index, 1);
        break;
    }
  };

  const getBucket = () => {
    return bucket;
  };

  return { title, addToBucket, getBucket, deleteFromBucket };
}

//temporary code to check functionality
let myBucket = createBucket("myBucket");
let myTodo = createTodoItem("myTodo", "test", "Jan,01", "1");
let myNote = createNote("myNote", "test");
myBucket.addToBucket(myTodo);
myBucket.addToBucket(myNote);
myBucket.addToBucket("This won't be added");
myBucket.deleteFromBucket(0, myNote);
console.log(myBucket.getBucket());
