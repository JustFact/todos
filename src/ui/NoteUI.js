import { bucketList } from "../bucketList";
import { createNote } from "../note";
import { displayList } from "./ui";

export const getAddNoteItemButton = (elementID) => {
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
};

export const getNotesUI = (data) => {
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
};

export const getAddNoteDialogUI = () => {
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
};
