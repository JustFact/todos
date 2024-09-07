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
  const bucketList = [];

  //element could be a todo List, notes or checklist
  const addToBucketList = (element) => {
    switch (findInstanceOf(element)) {
      case "todo":
        console.log("It's a todo item");
        break;
      case "note":
        console.log("it's a note");
        break;
    }
  };

  return { title, addToBucketList };
}

//temporary code to check functionality
let myBucket = createBucket("myBucket");
let myTodo = createTodoItem("myTodo", "test", "Nov,11", "1");
let myNote = createNote("myNote", "test");
myBucket.addToBucketList(myTodo);
myBucket.addToBucketList(myNote);
