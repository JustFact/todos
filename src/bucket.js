import { findInstanceOf } from "./utility.js";

export function createBucket(title) {
  const todo = [];
  const note = [];
  const bucket = [todo, note];

  //element could be a todo List, notes or checklist
  const addToBucket = (element) => {
    switch (findInstanceOf(element)) {
      case "todo":
        bucket[0].unshift(element);
        break;
      case "note":
        bucket[1].unshift(element);
        break;
    }
  };

  const deleteFromBucket = (index, elementType) => {
    switch (elementType) {
      case "todo":
        bucket[0].splice(index, 1);
        break;
      case "note":
        bucket[1].splice(index, 1);
        break;
    }
  };

  const editTodo = (index, title, description, date, priority) => {
    todo[index].title = title;
    todo[index].description = description;
    todo[index].dueDate = date;
    todo[index].priority = priority;
  };

  const editNote = (index, title, description) => {
    note[index].title = title;
    note[index].description = description;
  };

  const getTodo = (index) => {
    return bucket[0][index];
  };

  const getNote = (index) => {
    return bucket[1][index];
  };

  const getBucket = () => {
    return bucket;
  };

  const setBucket = (arr) => {
    bucket.splice(0, 2); //emptying the bucket array
    bucket.push(...arr);
  };

  return {
    title,
    addToBucket,
    getBucket,
    setBucket,
    deleteFromBucket,
    editTodo,
    editNote,
    getTodo,
    getNote,
  };
}
