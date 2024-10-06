import { todoSymbol } from "./todo";
import { noteSymbol } from "./note";
import { bucketList } from "./bucketList";

let TODO_DIALOG_OPEN_BY = "";
let TODO_EDIT_INDEX = "";
let NOTE_DIALOG_OPEN_BY = "";
let NOTE_EDIT_INDEX = "";

export function setTodoDialogOpenedBy(value) {
  TODO_DIALOG_OPEN_BY = value;
}

export function getTodoDialogOpenedBy() {
  return TODO_DIALOG_OPEN_BY;
}

export function setTodoEditIndex(value) {
  TODO_EDIT_INDEX = value;
}

export function getTodoEditIndex() {
  return TODO_EDIT_INDEX;
}

export function setNoteDialogOpenedBy(value) {
  NOTE_DIALOG_OPEN_BY = value;
}

export function getNoteDialogOpenedBy() {
  return NOTE_DIALOG_OPEN_BY;
}

export function setNoteEditIndex(value) {
  NOTE_EDIT_INDEX = value;
}

export function getNoteEditIndex() {
  return NOTE_EDIT_INDEX;
}

export function findInstanceOf(element) {
  //this will determine whether the element passed is
  //a todo item, note,
  if (element[todoSymbol]) {
    return "todo";
  } else if (element[noteSymbol]) {
    return "note";
  }
}

export function getElementTypeById(string) {
  return string.split("#")[1];
}

export function fetchData(string) {
  let arr = string.split("#");
  let bucketData = bucketList[arr[0]].getBucket();
  switch (getElementTypeById(string)) {
    case "todo":
      return bucketData[0];
    case "note":
      return bucketData[1];
  }
}
