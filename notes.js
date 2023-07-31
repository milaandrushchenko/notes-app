import { categories, notesData } from "./data.js";

export function getAllNotes() {
  return notesData;
}

export function addNote(note) {
  notesData.push(note);
}

export function editNote(id, updatedNote) {}

export function archiveNote(id) {}

export function unarchiveNote(id) {}

export function removeNote(id) {}
