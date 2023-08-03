import { categories, notesData } from "./data.js";

export function getAllNotes() {
  return notesData;
}

export function addNote(note) {
  notesData.push(note);
}

export function editNote(id, updatedNote) {
  const index = notesData.findIndex((note) => note.id === id);

  if (index !== -1) {
    notesData[index] = {
      ...notesData[index],
      ...updatedNote,
    };
  } else {
    console.log("Note with the specified id not found.");
  }
}

export function getNote(id) {
  let note = notesData.find((note) => note.id == id);
  return note;
}

export function archiveNote(id) {}

export function unarchiveNote(id) {}

export function removeNote(id) {
  let noteDel = notesData.find((note, index) => note.id == id);
  let index = notesData.indexOf(noteDel);
  notesData.splice(index, 1);
}

export function removeAllNotes() {
  notesData.splice(0, notesData.length);
}
