import "./style.css";
import { fetchData, getElementTypeById } from "./utility";
import { bucketList } from "./bucketList.js";
import { createBucket } from "./bucket.js";
import { createTodoItem } from "./todo.js";

const expand = (e) => {
  e.target.nextSibling.firstChild.classList.toggle("show");
};

const bucketListNavClick = (e) => {
  displayList(e.target.dataset.index);
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

function displayList(elementID) {
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
}

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

    const content = document.createElement("div");
    content.classList.add("main-content");
    document.body.replaceChildren(
      ...[sidePanel, content, addBucketDialog, addTodoItemDialog]
    );
  }
};

function getAddTodoItemButton(elementID) {
  let button = document.createElement("button");
  button.classList.add("addTodoItemButton");
  button.innerText = "+ New Todo Item";
  button.dataset.index = elementID;
  button.addEventListener("click", (e) => {
    let newTodoItemDialog = document.querySelector(".newTodoItemDialog");
    newTodoItemDialog.showModal();
  });
  return button;
}

function getAddNoteItemButton(elementID) {
  let button = document.createElement("button");
  button.classList.add("addNoteItemButton");
  button.innerText = "+ New Note Item";
  button.dataset.index = elementID;
  button.addEventListener("click", (e) => {
    let newNoteItemDialog = document.querySelector(".newNoteItemDialog");
    newNoteItemDialog.showModal();
  });
  return button;
}

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

  let buttonOk = document.createElement("button");
  buttonOk.innerText = "Ok";
  buttonOk.classList.add("newBucketSubmitButton");
  buttonOk.addEventListener("click", (e) => {
    e.preventDefault();
    let newName = bucketName.value ? bucketName.value : "New Bucket";
    bucketList.push(createBucket(newName));
    dialog.close();
    displayUI();
  });

  let buttonCancel = document.createElement("button");
  buttonCancel.innerText = "Cancel";
  buttonCancel.classList.add("newBucketCancelButton");
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

  let form = document.createElement("form");
  form.append(bucketName, buttonOk, buttonCancel);

  dialog.append(form);
  return dialog;
}

function getAddTodoDialogUI() {
  let dialog = document.createElement("dialog");
  dialog.classList.add("newTodoItemDialog");

  let todoTitle = document.createElement("input");
  todoTitle.classList.add("newTodoTitle");
  todoTitle.placeholder = "Enter Todo Title";

  let todoDescription = document.createElement("textarea");
  todoDescription.classList.add("newTodoDescription");
  todoDescription.placeholder = "Enter Todo Description";
  todoDescription.cols = 50;
  todoDescription.rows = 5;

  let dueDateLabel = document.createElement("label");
  dueDateLabel.innerText = "Due Date: ";
  let todoDueDate = document.createElement("input");
  todoDueDate.classList.add("newTodoDueDate");
  todoDueDate.type = "date";

  dueDateLabel.append(todoDueDate);

  let priorityLabel = document.createElement("label");
  priorityLabel.innerText = "Priority: ";
  let todoPriority = document.createElement("select");
  todoPriority.classList.add("newTodoPriority");
  let priorityOptionLow = document.createElement("option");
  let priorityOptionMid = document.createElement("option");
  let priorityOptionHigh = document.createElement("option");
  let priorityOptionVHigh = document.createElement("option");

  priorityOptionLow.value = 1;
  priorityOptionLow.innerText = "Low";
  priorityOptionMid.value = 2;
  priorityOptionMid.innerText = "Medium";
  priorityOptionHigh.value = 3;
  priorityOptionHigh.innerText = "High";
  priorityOptionVHigh.value = 4;
  priorityOptionVHigh.innerText = "Very High";

  todoPriority.append(
    priorityOptionLow,
    priorityOptionMid,
    priorityOptionHigh,
    priorityOptionVHigh
  );

  priorityLabel.append(todoPriority);

  let div = document.createElement("div");
  div.append(dueDateLabel, priorityLabel);

  let buttonDiv = document.createElement("div");
  let buttonOk = document.createElement("button");
  buttonOk.classList.add("newTodoItemSubmitButton");
  buttonOk.innerText = "Ok";
  buttonOk.addEventListener("click", (e) => {
    e.preventDefault();
    let addButton = document.querySelector(".addTodoItemButton");
    let bucket = bucketList[addButton.dataset.index.split("#")[0]];

    let todoItem = createTodoItem(
      todoTitle.value,
      todoDescription.value,
      todoDueDate.value,
      todoPriority.value
    );
    bucket.addToBucket(todoItem);
    // console.log(bucket);
    todoTitle.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
    todoPriority.selectedIndex = 0;

    let element = document.querySelector(".addTodoItemButton");
    displayList(element.dataset.index);
    dialog.close();
  });

  let buttonCancel = document.createElement("button");
  buttonCancel.classList.add("newTodoItemCancelButton");
  buttonCancel.innerText = "Cancel";
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    todoTitle.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
    todoPriority.selectedIndex = 0;
    dialog.close();
  });

  buttonDiv.append(buttonOk, buttonCancel);

  let form = document.createElement("form");
  form.append(todoTitle, todoDescription, div, buttonDiv);

  dialog.append(form);
  return dialog;
}
