import { todoSymbol } from "./todo";
import { noteSymbol } from "./note";
import { bucketList } from "./bucketList";

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
