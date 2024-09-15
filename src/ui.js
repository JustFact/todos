import { bucketList } from "./bucketList";
import "./style.css";
import { fetchData } from "./utility";

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

function displayUI(elementID) {
  let data = fetchData(elementID);
  let elementUI;
  switch (elementID.split("#")[1]) {
    case "todo":
      elementUI = getTodoListUI(data);
      break;
    case "note":
      elementUI = getNotesUI(data);
      break;
  }
  let content = document.querySelector(".main-content");
  content.replaceChildren(...[elementUI]);
}

function getTodoListUI(data) {
  const todoList = document.createElement("div");
  todoList.classList.add("todoList");
  for (let i = 0; i < data.length; i++) {
    const todoListItem = document.createElement("div");
    todoListItem.classList.add("todoListItem");

    const todoTitle = document.createElement("h3");
    const todoDescription = document.createElement("p");
    const todoDueDate = document.createElement("div");
    const todoPriority = document.createElement("div");

    todoTitle.innerText = bucketList[0].getBucket()[0][i].title;
    todoDescription.innerText = bucketList[0].getBucket()[0][i].description;
    todoDueDate.innerText = bucketList[0].getBucket()[0][i].dueDate;
    todoPriority.innerText = bucketList[0].getBucket()[0][i].priority;

    todoListItem.append(todoTitle, todoDescription, todoDueDate, todoPriority);
    todoList.append(todoListItem);
  }
  return todoList;
}

function getNotesUI(data) {
  const NoteList = document.createElement("div");
  NoteList.classList.add("NoteList");
  for (let i = 0; i < data.length; i++) {
    const NoteListItem = document.createElement("div");
    NoteListItem.classList.add("NoteListItem");

    const todoTitle = document.createElement("h3");
    const todoDescription = document.createElement("p");

    todoTitle.innerText = bucketList[0].getBucket()[1][i].title;
    todoDescription.innerText = bucketList[0].getBucket()[1][i].description;

    NoteListItem.append(todoTitle, todoDescription);
    NoteList.append(NoteListItem);
  }
  return NoteList;
}
