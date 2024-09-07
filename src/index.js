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
  const bucketList = [todo, note];

  //element could be a todo List, notes or checklist
  const addToBucketList = (element) => {
    switch (findInstanceOf(element)) {
      case "todo":
        bucketList[0].push(element);
        break;
      case "note":
        bucketList[1].push(element);
        break;
    }
  };
  const getBucketList = () => {
    return bucketList;
  };
  return { title, addToBucketList, getBucketList };
}

//temporary code to check functionality
let myBucket = createBucket("myBucket");
let myTodo = createTodoItem("myTodo", "test", "Jan,01", "1");
let myNote = createNote("myNote", "test");
myBucket.addToBucketList(myTodo);
myBucket.addToBucketList(myNote);
console.log(myBucket.getBucketList());
