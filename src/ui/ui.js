import "../style.css";
import { fetchData, getElementTypeById, updateLocalStorage } from "../utility";
import { bucketList } from "../bucketList.js";
import {
  getAddBucketButton,
  getAddBucketDialogUI,
  getBucketListNavigator,
} from "./BucketNavList.js";
import {
  getAddTodoDialogUI,
  getAddTodoItemButton,
  getTodoListUI,
} from "./TodoUI.js";
import {
  getAddNoteDialogUI,
  getAddNoteItemButton,
  getNotesUI,
} from "./NoteUI.js";

export const displayList = (elementID) => {
  let data = fetchData(elementID);
  let elementUI;
  let newItemButton;
  switch (getElementTypeById(elementID)) {
    case "todo":
      elementUI = getTodoListUI(data);
      newItemButton = getAddTodoItemButton(elementID);
      break;
    case "note":
      elementUI = getNotesUI(data);
      newItemButton = getAddNoteItemButton(elementID);
      break;
  }
  let content = document.querySelector(".main-content");
  content.replaceChildren(...[newItemButton, elementUI]);

  //updates the Todo and Note List of a bucket
  updateLocalStorage();
};

export const displayUI = (elementID = 0) => {
  if (elementID != 0) {
  } else {
    const bucketListUI = getBucketListNavigator(bucketList);
    const addBucketButton = getAddBucketButton();

    const sidePanel = document.createElement("div");
    sidePanel.classList.add("side-panel");
    sidePanel.replaceChildren(...[addBucketButton, bucketListUI]);

    const addBucketDialog = getAddBucketDialogUI();
    const addTodoItemDialog = getAddTodoDialogUI();
    const addNoteItemDialog = getAddNoteDialogUI();

    const content = document.createElement("div");
    content.classList.add("main-content");
    document.body.replaceChildren(
      ...[
        sidePanel,
        content,
        addBucketDialog,
        addTodoItemDialog,
        addNoteItemDialog,
      ]
    );
  }

  //updates buckets in bucketList
  updateLocalStorage();
};
