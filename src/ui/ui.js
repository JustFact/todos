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
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML =
      '<svg class="icon logoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>My Bucket List</title><path d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" /></svg> <h3 class="logoText" >My Bucket List</h3>';
    // logo.append(logoIcon, logoText);

    const sidePanel = document.createElement("div");
    sidePanel.classList.add("side-panel");
    sidePanel.replaceChildren(...[logo, addBucketButton, bucketListUI]);

    const addBucketDialog = getAddBucketDialogUI();
    const addTodoItemDialog = getAddTodoDialogUI();
    const addNoteItemDialog = getAddNoteDialogUI();

    const content = document.createElement("div");
    content.classList.add("main-content");
    const emptyBucketPlaceholder = document.createElement("div");
    emptyBucketPlaceholder.classList.add("emptyBucket");
    emptyBucketPlaceholder.innerText =
      "Please select any bucket from side panel or create a new one!";
    content.append(emptyBucketPlaceholder);
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
