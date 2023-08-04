import {
  addNote,
  editNote,
  archiveNote,
  removeNote,
  getArchivedNotes,
} from "./notes.js";
import {
  renderNotesTable,
  renderArchivedNotesTable,
  init,
  createNewNote,
  deleteNote,
  updateNote,
  saveNote,
  clearNoteForm,
  handleArchiveNote,
  handleRadioClick,
} from "./dom.js";
import { modal } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  modal._element.addEventListener("hidden.bs.modal", () => {
    // Очищаємо поля форми при закритті модального вікна
    clearNoteForm();
  });

  init();

  handleRadioClick();
  handleArchiveNote();

  createNewNote();
  deleteNote();
  updateNote();
  saveNote();
});
