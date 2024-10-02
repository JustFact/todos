import { createBucket } from "../bucket";
import { bucketList } from "../bucketList";
import { displayList, displayUI } from "./ui";

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

function displayAddBucketDialogUI(e) {
  const addBucketDialog = document.querySelector(".newBucketDialog");
  addBucketDialog.showModal();
}

export const getAddBucketButton = () => {
  let button = document.createElement("button");
  button.classList.add("addBucketButton");
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Bucket!';
  button.dataset.elementOps = "newBucket";
  button.addEventListener("click", displayAddBucketDialogUI);
  return button;
};

export const getAddBucketDialogUI = () => {
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
};
