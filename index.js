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
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesData = getAllNotes();

  renderNotesTable(notesData);
  updateSummaryData(notesData);

  // Додайте обробник подій для кнопок та форми тут
});
