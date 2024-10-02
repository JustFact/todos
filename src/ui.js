import "./style.css";
import { fetchData, getElementTypeById } from "./utility";
import { bucketList } from "./bucketList.js";
import { createBucket } from "./bucket.js";
import { createTodoItem } from "./todo.js";
import { createNote } from "./note.js";

const expand = (e) => {
  e.currentTarget.nextSibling.firstChild.classList.toggle("show");
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

    bucketTitle.innerHTML =
      '<svg class="icon bucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pail</title><path d="M11.5 7.63C11.97 7.35 12.58 7.5 12.86 8C13.14 8.47 12.97 9.09 12.5 9.36L4.27 14.11C3.79 14.39 3.18 14.23 2.9 13.75C2.62 13.27 2.79 12.66 3.27 12.38L11.5 7.63M7 21L5.79 14.97L13.21 10.69C14 10.26 14.5 9.44 14.5 8.5C14.5 7.12 13.38 6 12 6C11.53 6 11.09 6.13 10.71 6.36L4.76 9.79L4 6H3V4H21V6H20L17 21H7Z" /></svg>' +
      BucketList[i].title;

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
};

function getAddTodoItemButton(elementID) {
  let button = document.createElement("button");
  button.classList.add("addTodoItemButton");
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Todo Item';
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
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Note Item';
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
    todoListItem.classList.add("todoListItem", "collapse");

    const todoTitle = document.createElement("h4");
    todoTitle.classList.add("todo-title", "collapse");
    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description", "collapse");
    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-dueDate", "collapse");
    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority", "collapse");

    todoTitle.innerText = data[i].title;
    todoDescription.innerText = data[i].description;
    todoDueDate.innerText = data[i].dueDate;
    todoPriority.innerText = data[i].priority;

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv", "collapse");

    let editButton = document.createElement("button");
    editButton.classList.add("todoEditButton", "collapse");
    editButton.innerHTML =
      '<svg class="icon todoEditIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lead-pencil</title><path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" /></svg>';

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("todoDeleteButton");
    deleteButton.innerHTML =
      '<svg class="icon todoDeleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';

    buttonDiv.append(editButton, deleteButton);

    todoTitle.addEventListener("click", () => {
      todoListItem.classList.toggle("collapse");
      todoTitle.classList.toggle("collapse");
      todoDescription.classList.toggle("collapse");
      todoDueDate.classList.toggle("collapse");
      todoPriority.classList.toggle("collapse");
      buttonDiv.classList.toggle("collapse");
    });

    todoListItem.append(
      todoTitle,
      buttonDiv,
      todoDescription,
      todoDueDate,
      todoPriority
    );
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

    const noteTitle = document.createElement("h4");
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
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Bucket!';
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

function getAddNoteDialogUI() {
  let dialog = document.createElement("dialog");
  dialog.classList.add("newNoteItemDialog");

  let noteTitle = document.createElement("input");
  noteTitle.classList.add("newNoteTitle");
  noteTitle.placeholder = "Enter Note Title";

  let noteDescription = document.createElement("textarea");
  noteDescription.classList.add("newNoteDescription");
  noteDescription.placeholder = "Enter Note Description";
  noteDescription.cols = 50;
  noteDescription.rows = 5;

  let buttonDiv = document.createElement("div");
  let buttonOk = document.createElement("button");
  buttonOk.classList.add("newNoteItemSubmitButton");
  buttonOk.innerText = "Ok";
  buttonOk.addEventListener("click", (e) => {
    e.preventDefault();
    let addButton = document.querySelector(".addNoteItemButton");
    let bucket = bucketList[addButton.dataset.index.split("#")[0]];

    let noteItem = createNote(noteTitle.value, noteDescription.value);
    bucket.addToBucket(noteItem);
    noteTitle.value = "";
    noteDescription.value = "";

    let element = document.querySelector(".addNoteItemButton");
    displayList(element.dataset.index);
    dialog.close();
  });

  let buttonCancel = document.createElement("button");
  buttonCancel.classList.add("newNoteItemCancelButton");
  buttonCancel.innerText = "Cancel";
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    noteTitle.value = "";
    noteDescription.value = "";
    dialog.close();
  });

  buttonDiv.append(buttonOk, buttonCancel);

  let form = document.createElement("form");
  form.append(noteTitle, noteDescription, buttonDiv);

  dialog.append(form);
  return dialog;
}
