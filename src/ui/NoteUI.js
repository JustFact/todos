import { bucketList } from "../bucketList";
import { createNote } from "../note";
import {
  getNoteDialogOpenedBy,
  getNoteEditIndex,
  setNoteDialogOpenedBy,
  setNoteEditIndex,
} from "../utility";
import { displayList } from "./ui";

export const getAddNoteItemButton = (elementID) => {
  let button = document.createElement("button");
  button.classList.add("addNoteItemButton");
  button.innerHTML =
    '<svg class="icon plusBucket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> New Note Item';
  button.dataset.index = elementID;
  button.addEventListener("click", (e) => {
    setNoteDialogOpenedBy("addNote");
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
    NoteListItem.dataset.index = i;

    const noteTitle = document.createElement("h4");
    noteTitle.classList.add("note-title");
    const noteDescription = document.createElement("p");
    noteDescription.classList.add("note-description");

    noteTitle.innerText = data[i].title;
    noteDescription.innerText = data[i].description;

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv", "collapse");

    let editButton = document.createElement("button");
    editButton.classList.add("noteEditButton", "collapse");
    editButton.innerHTML =
      '<svg class="icon noteEditIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lead-pencil</title><path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" /></svg>';

    editButton.addEventListener("click", (e) => {
      setNoteDialogOpenedBy("editNote");
      let noteItemDialog = document.querySelector(".newNoteItemDialog");
      let noteIndex = e.currentTarget.parentNode.parentNode.dataset.index;
      setNoteEditIndex(noteIndex);
      let elementID =
        document.querySelector(".addNoteItemButton").dataset.index;
      let bucketIndex = elementID.split("#")[0];

      let dialogTitle = document.querySelector(".newNoteTitle");
      let dialogDescription = document.querySelector(".newNoteDescription");

      let currentNote = bucketList[bucketIndex].getNote(noteIndex);

      dialogTitle.value = currentNote.title;
      dialogDescription.value = currentNote.description;

      noteItemDialog.showModal();
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("noteDeleteButton");
    deleteButton.innerHTML =
      '<svg class="icon noteDeleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-forever</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>';

    deleteButton.addEventListener("click", (e) => {
      let noteItemIndex = e.currentTarget.parentNode.parentNode.dataset.index;
      let elementID =
        document.querySelector(".addNoteItemButton").dataset.index;
      let bucketIndex = elementID.split("#")[0];
      bucketList[bucketIndex].deleteFromBucket(noteItemIndex, "note");
      displayList(elementID);
    });

    buttonDiv.append(editButton, deleteButton);

    NoteListItem.append(noteTitle, buttonDiv, noteDescription);
    NoteList.append(NoteListItem);
  }
  if (data.length === 0) {
    const emptyNotePlaceholder = document.createElement("span");
    emptyNotePlaceholder.classList.add("emptyNote");
    emptyNotePlaceholder.innerText =
      'Create a new Note item by clicking "+New Note Item" button above.';
    NoteList.append(emptyNotePlaceholder);
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
    let value = getNoteDialogOpenedBy();
    switch (value) {
      case "addNote":
        let addButton = document.querySelector(".addNoteItemButton");
        let bucket = bucketList[addButton.dataset.index.split("#")[0]];

        let noteItem = createNote(noteTitle.value, noteDescription.value);
        bucket.addToBucket(noteItem);
        noteTitle.value = "";
        noteDescription.value = "";

        let element = document.querySelector(".addNoteItemButton");
        displayList(element.dataset.index);
        dialog.close();
        break;

      case "editNote":
        let elementID =
          document.querySelector(".addNoteItemButton").dataset.index;
        let bucketIndex = elementID.split("#")[0];
        let dialogTitle = document.querySelector(".newNoteTitle");
        let dialogDescription = document.querySelector(".newNoteDescription");

        bucketList[bucketIndex].editNote(
          getNoteEditIndex(),
          dialogTitle.value,
          dialogDescription.value
        );
        displayList(elementID);
        dialog.close();
        break;
    }

    noteTitle.value = "";
    noteDescription.value = "";
    setNoteDialogOpenedBy("");
    setNoteEditIndex("");
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
