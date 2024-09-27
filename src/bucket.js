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
