import "./style.css";
import { fetchData, getElementTypeById } from "./utility";
import { bucketList } from "./bucketList.js";
import { createBucket } from "./bucket.js";

const expand = (e) => {
  e.target.nextSibling.firstChild.classList.toggle("show");
};

const bucketListNavClick = (e) => {
  displayUI(e.target.dataset.index);
};

export const getBucketListNavigator = (BucketList) => {
  const bucketUL = document.createElement("ul");
  for (let i = 0; i < BucketList.length; i++) {
    const bucketLI = document.createElement("li");
    const subBucketUL = document.createElement("ul");
    const bucketTitle = document.createElement("li");
    const subBucketTodos = document.createElement("li");
    const subBucketNotes = document.createElement("li");

    bucketTitle.innerText = BucketList[i].title;

    subBucketTodos.innerText = "Todos";
    subBucketTodos.dataset.index = `${i}#todo`;
    subBucketTodos.addEventListener("click", bucketListNavClick);

    subBucketNotes.innerText = "Notes";
    subBucketNotes.dataset.index = `${i}#note`;
    subBucketNotes.addEventListener("click", bucketListNavClick);

    bucketTitle.addEventListener("click", expand);

    bucketUL.append(bucketTitle);
    subBucketUL.append(subBucketTodos);
    subBucketUL.append(subBucketNotes);
    bucketLI.append(subBucketUL);
    bucketUL.append(bucketLI);
  }

  return bucketUL;
};

export const displayUI = (elementID = 0) => {
  if (elementID != 0) {
    let data = fetchData(elementID);
    let elementUI;
    switch (getElementTypeById(elementID)) {
      case "todo":
        elementUI = getTodoListUI(data);
        break;
      case "note":
        elementUI = getNotesUI(data);
        break;
    }
    let content = document.querySelector(".main-content");
    content.replaceChildren(...[elementUI]);
  } else {
    const bucketListUI = getBucketListNavigator(bucketList);
    const addBucketButton = getAddBucketButton();

    const sidePanel = document.createElement("div");
    sidePanel.classList.add("side-panel");
    sidePanel.replaceChildren(...[addBucketButton, bucketListUI]);

    const addBucketDialog = getAddBucketDialogUI();

    const content = document.createElement("div");
    content.classList.add("main-content");
    document.body.replaceChildren(...[sidePanel, content, addBucketDialog]);
  }
};

function getTodoListUI(data) {
  const todoList = document.createElement("div");
  todoList.classList.add("todoList");
  for (let i = 0; i < data.length; i++) {
    const todoListItem = document.createElement("div");
    todoListItem.classList.add("todoListItem");

    const todoTitle = document.createElement("h3");
    todoTitle.classList.add("todo-title");
    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description");
    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-dueDate");
    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority");

    todoTitle.innerText = data[i].title;
    todoDescription.innerText = data[i].description;
    todoDueDate.innerText = data[i].dueDate;
    todoPriority.innerText = data[i].priority;

    todoListItem.append(todoTitle, todoDescription, todoDueDate, todoPriority);
    todoList.append(todoListItem);
  }
  return todoList;
}

function getNotesUI(data) {
  const NoteList = document.createElement("div");
  NoteList.classList.add("noteList");
  for (let i = 0; i < data.length; i++) {
    const NoteListItem = document.createElement("div");
    NoteListItem.classList.add("noteListItem");

    const noteTitle = document.createElement("h3");
    noteTitle.classList.add("note-title");
    const noteDescription = document.createElement("p");
    noteDescription.classList.add("note-description");

    noteTitle.innerText = data[i].title;
    noteDescription.innerText = data[i].description;

    NoteListItem.append(noteTitle, noteDescription);
    NoteList.append(NoteListItem);
  }
  return NoteList;
}

function displayAddBucketDialogUI(e) {
  const addBucketDialog = document.querySelector(".newBucketDialog");
  addBucketDialog.showModal();
}

function getAddBucketButton() {
  let button = document.createElement("button");
  button.classList.add("addBucketButton");
  button.innerText = "+ New Bucket!";
  button.dataset.elementOps = "newBucket";
  button.addEventListener("click", displayAddBucketDialogUI);
  return button;
}

function getAddBucketDialogUI() {
  let dialog = document.createElement("dialog");
  dialog.classList.add("newBucketDialog");

  let bucketName = document.createElement("input");
  bucketName.classList.add("newBucketName");
  bucketName.placeholder = "Enter New Bucket Name";

  let button = document.createElement("button");
  button.innerText = "Ok";
  button.classList.add("newBucketSubmitButton");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let newName = bucketName.value ? bucketName.value : "New Bucket";
    bucketList.push(createBucket(newName));
    dialog.close();
    displayUI();
  });

  let form = document.createElement("form");
  form.append(bucketName, button);

  dialog.append(form);
  return dialog;
}
