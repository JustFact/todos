import { bucketList } from "../bucketList";
import { createTodoItem } from "../todo";
import {
  getTodoDialogOpenedBy,
  getTodoEditIndex,
  setTodoDialogOpenedBy,
  setTodoEditIndex,
} from "../utility";
import { displayList } from "./ui";

export const getAddTodoItemButton = (elementID) => {
  let button = document.createElement("button");
  button.classList.add("addTodoItemButton");
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Todo Item';
  button.dataset.index = elementID;
  button.addEventListener("click", (e) => {
    setTodoDialogOpenedBy("addTodo");
    let newTodoItemDialog = document.querySelector(".newTodoItemDialog");
    newTodoItemDialog.showModal();
  });
  return button;
};

export const getTodoListUI = (data) => {
  const todoList = document.createElement("div");
  todoList.classList.add("todoList");
  for (let i = 0; i < data.length; i++) {
    const todoListItem = document.createElement("div");
    todoListItem.classList.add("todoListItem", "collapse");
    todoListItem.dataset.index = i;

    const todoTitle = document.createElement("h4");
    todoTitle.classList.add("todo-title", "collapse");
    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description", "collapse");
    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-dueDate", "collapse");
    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority", "collapse");

    let todoItemAnchor = document.createElement("a");
    todoItemAnchor.href = "#";
    todoItemAnchor.innerText = data[i].title;
    todoTitle.append(todoItemAnchor);
    todoDescription.innerText = data[i].description;
    todoDueDate.innerText = data[i].dueDate;
    let priorityIcons = [
      '<svg class="icon priorityIcon priority-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,21H21V1M19,5.83V19H11V13.83" /></svg>',
      '<svg class="icon priorityIcon priority-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,21H21V1M19,5.83V19H13V11.83" /></svg>',
      '<svg class="icon priorityIcon priority-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,21H21V1M19,5.83V19H16V8.83" /></svg>',
      '<svg class="icon priorityIcon priority-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1,21H21V1" /></svg>',
    ];
    todoPriority.innerHTML = priorityIcons[data[i].priority - 1];

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv", "collapse");

    let editButton = document.createElement("button");
    editButton.classList.add("todoEditButton", "collapse");
    editButton.innerHTML =
      '<svg class="icon todoEditIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lead-pencil</title><path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" /></svg>';

    editButton.addEventListener("click", (e) => {
      setTodoDialogOpenedBy("editTodo");
      let todoItemDialog = document.querySelector(".newTodoItemDialog");
      let todoIndex = e.currentTarget.parentNode.parentNode.dataset.index;
      setTodoEditIndex(todoIndex);
      let elementID =
        document.querySelector(".addTodoItemButton").dataset.index;
      let bucketIndex = elementID.split("#")[0];

      // setTodoEditIndex(todoIndex);
      let dialogTitle = document.querySelector(".newTodoTitle");
      let dialogDescription = document.querySelector(".newTodoDescription");
      let dialogDueDate = document.querySelector(".newTodoDueDate");
      let dialogPriority = document.querySelector(".newTodoPriority");

      let currentTodo = bucketList[bucketIndex].getTodo(todoIndex);

      dialogTitle.value = currentTodo.title;
      dialogDescription.value = currentTodo.description;
      dialogDueDate.value = currentTodo.dueDate;
      dialogPriority.value = currentTodo.priority;

      todoItemDialog.showModal();
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("todoDeleteButton");
    deleteButton.innerHTML =
      '<svg class="icon todoDeleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';

    deleteButton.addEventListener("click", (e) => {
      let todoItemIndex = e.currentTarget.parentNode.parentNode.dataset.index;
      let elementID =
        document.querySelector(".addTodoItemButton").dataset.index;
      let bucketIndex = elementID.split("#")[0];
      bucketList[bucketIndex].deleteFromBucket(todoItemIndex, "todo");
      displayList(elementID);
    });

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
};

export const getAddTodoDialogUI = () => {
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
    let value = getTodoDialogOpenedBy();
    switch (value) {
      case "addTodo":
        let addButton = document.querySelector(".addTodoItemButton");
        let bucket = bucketList[addButton.dataset.index.split("#")[0]];

        let todoItem = createTodoItem(
          todoTitle.value,
          todoDescription.value,
          todoDueDate.value,
          todoPriority.value
        );
        bucket.addToBucket(todoItem);
        let element = document.querySelector(".addTodoItemButton");
        displayList(element.dataset.index);

        dialog.close();
        break;

      case "editTodo":
        let elementID =
          document.querySelector(".addTodoItemButton").dataset.index;
        let bucketIndex = elementID.split("#")[0];
        let dialogTitle = document.querySelector(".newTodoTitle");
        let dialogDescription = document.querySelector(".newTodoDescription");
        let dialogDueDate = document.querySelector(".newTodoDueDate");
        let dialogPriority = document.querySelector(".newTodoPriority");

        bucketList[bucketIndex].editTodo(
          getTodoEditIndex(),
          dialogTitle.value,
          dialogDescription.value,
          dialogDueDate.value,
          dialogPriority.value
        );
        displayList(elementID);
        dialog.close();
        break;
    }

    //resetting everything once closed
    todoTitle.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
    todoPriority.selectedIndex = 0;
    setTodoDialogOpenedBy("");
    setTodoEditIndex("");
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
    setTodoDialogOpenedBy("");
    setTodoEditIndex("");
    dialog.close();
  });

  buttonDiv.append(buttonOk, buttonCancel);

  let form = document.createElement("form");
  form.append(todoTitle, todoDescription, div, buttonDiv);

  dialog.append(form);
  return dialog;
};
