import {
  getAllNotes,
  addNote,
  editNote,
  archiveNote,
  unarchiveNote,
  removeNote,
} from "./notes.js";
import {
  renderNotesTable,
  renderArchivedNotesTable,
  updateSummaryData,
  init,
  createNewNote,
  deleteNote,
  updateNote,
  saveNote,
  clearNoteForm,
} from "./dom.js";
import { modal } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  modal._element.addEventListener("hidden.bs.modal", () => {
    // Очищаємо поля форми при закритті модального вікна
    clearNoteForm();
  });

  init();

  createNewNote();
  deleteNote();
  updateNote();
  saveNote();
});
