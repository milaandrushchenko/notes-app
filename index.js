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
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  init();

  createNewNote();
  deleteNote();
});
