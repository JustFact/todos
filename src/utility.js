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

export function fetchData(string) {
  let arr = string.split("#");
  let bucketData = bucketList[arr[0]].getBucket();
  switch (arr[1]) {
    case "todo":
      return bucketData[0];
    case "note":
      return bucketData[1];
  }
}
