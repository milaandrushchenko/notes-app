import { categories } from "./data.js";
import {
  archiveNote,
  editNote,
  removeNote,
  addNote,
  getActiveNotes,
  removeAllNotes,
  getNote,
  getArchivedNotes,
  archiveAllNote,
  getCategoryStats,
} from "./notes.js";
import {
  generateUUID,
  getIcon,
  modal,
  parseDate,
  truncateText,
  validateForm,
} from "./utils.js";

let currentNote = null;

export function handleRadioClick() {
  const radio = document.querySelector(".radio");

  radio.addEventListener("click", () => {
    const activeNotesRadio = event.target.closest("#activeNotes");
    const archivedNotesRadio = event.target.closest("#archivedNotes");

    if (archivedNotesRadio) {
      renderArchivedNotesTable(getArchivedNotes());
    }
    if (activeNotesRadio) {
      renderNotesTable(getActiveNotes());
    }
  });
}

export function renderNotesTable(notes) {
  const tableBody = document.querySelector("#notesTable tbody");

  // Очищаємо таблицю перед оновленням
  tableBody.innerHTML = "";

  // Ітеруємося по масиву з записами
  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.classList.add("table-light");

    const iconCell = document.createElement("td");
    iconCell.innerHTML = `<div class="circle-icon  text-white"><i class="fa-solid fa-lg ${getIcon(
      note.category
    )}"></i></div>`;
    row.appendChild(iconCell);

    // Створюємо комірки для ідентифікатора, дати створення, контенту, категорії та дат
    const nameCell = document.createElement("th");
    nameCell.setAttribute("scope", "row");
    nameCell.textContent = truncateText(note.name, 20);
    row.appendChild(nameCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = note.created;
    row.appendChild(dateCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = note.category;
    row.appendChild(categoryCell);

    const contentCell = document.createElement("td");
    contentCell.textContent = truncateText(note.content, 20);

    row.appendChild(contentCell);

    const datesCell = document.createElement("td");
    datesCell.textContent = truncateText(parseDate(note.content), 20);
    row.appendChild(datesCell);

    // Додаємо комірку для кнопок редагування, видалення та архівації
    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "edit-button");
    editButton.innerHTML =
      '<i class="fa-solid fa-xl fa-pen" style="color: #7a7a7a;"></i>';
    editButton.setAttribute("data-note-id", note.id);
    actionsCell.appendChild(editButton);

    const archiveButton = document.createElement("button");
    archiveButton.classList.add("btn", "archive-button");
    archiveButton.innerHTML =
      '<i class="fa-solid fa-xl fa-box-archive" style="color: #7a7a7a;"></i>';
    archiveButton.setAttribute("data-note-id", note.id);
    actionsCell.appendChild(archiveButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "delete-button");
    deleteButton.innerHTML =
      '<i class="fa-solid fa-xl fa-trash" style="color: #7a7a7a;"></i>';
    deleteButton.setAttribute("data-note-id", note.id);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    // Додаємо рядок до тіла таблиці
    tableBody.appendChild(row);
  });
}

export function renderArchivedNotesTable(notes) {
  const tableBody = document.querySelector("#notesTable tbody");

  // Очищаємо таблицю перед оновленням
  tableBody.innerHTML = "";

  // Ітеруємося по масиву з записами
  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.classList.add("table-light");

    const iconCell = document.createElement("td");
    iconCell.innerHTML = `<div class="circle-icon  text-white"><i class="fa-solid fa-lg ${getIcon(
      note.category
    )}"></i></div>`;
    row.appendChild(iconCell);

    const nameCell = document.createElement("th");
    nameCell.setAttribute("scope", "row");
    nameCell.textContent = truncateText(note.name, 20);
    row.appendChild(nameCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = note.created;
    row.appendChild(dateCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = note.category;
    row.appendChild(categoryCell);

    const contentCell = document.createElement("td");
    contentCell.textContent = truncateText(note.content, 20);

    row.appendChild(contentCell);

    const datesCell = document.createElement("td");
    datesCell.textContent = truncateText(parseDate(note.content), 20);
    row.appendChild(datesCell);

    const actionsCell = document.createElement("td");

    const unArchiveButton = document.createElement("button");
    unArchiveButton.classList.add("btn", "unarchive-button");
    unArchiveButton.innerHTML =
      '<i class="fa-solid fa-box-open fa-xl" style="color: #7a7a7a;"></i>';
    unArchiveButton.setAttribute("data-note-id", note.id);
    actionsCell.appendChild(unArchiveButton);

    row.appendChild(actionsCell);

    // Додаємо рядок до тіла таблиці
    tableBody.appendChild(row);
  });
}

export function renderSummaryTable() {
  const tableBody = document.querySelector("#summaryTable tbody");

  // Очищаємо таблицю перед оновленням
  tableBody.innerHTML = "";

  let categoryStats = getCategoryStats();
  for (const category in categoryStats) {
    const stats = categoryStats[category];

    const row = document.createElement("tr");
    row.classList.add("table-light");

    const iconCell = document.createElement("td");
    iconCell.innerHTML = `<div class="circle-icon  text-white"><i class="fa-solid fa-lg ${getIcon(
      category
    )}"></i></div>`;
    row.appendChild(iconCell);

    const nameCell = document.createElement("td");
    nameCell.setAttribute("scope", "row");
    nameCell.textContent = truncateText(category, 20);
    row.appendChild(nameCell);

    const activeCount = document.createElement("td");
    activeCount.setAttribute("scope", "row");
    activeCount.textContent = stats.activeNotes;
    row.appendChild(activeCount);

    const archiveCount = document.createElement("td");
    archiveCount.setAttribute("scope", "row");
    archiveCount.textContent = stats.archivedNotes;
    row.appendChild(archiveCount);

    tableBody.appendChild(row);
  }
}

export function createNewNote() {
  let btnCreateNote = document.querySelector(".create-note");

  showCategories();

  btnCreateNote.addEventListener("click", () => {
    modal.show();
  });
}

export function updateNote() {
  const tableBody = document.querySelector("#notesTable tbody");

  const noteName = document.querySelector("#note-name");
  const noteContent = document.querySelector("#note-content");

  tableBody.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit-button");

    if (editButton) {
      const noteId = editButton.getAttribute("data-note-id");

      currentNote = getNote(noteId);

      noteName.value = currentNote.name;
      noteContent.value = currentNote.content;

      modal.show();
    }
  });
}

export function deleteNote() {
  const tableBody = document.querySelector("#notesTable tbody");

  tableBody.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-button");

    if (deleteButton) {
      const noteId = deleteButton.getAttribute("data-note-id");
      removeNote(noteId);
      init();
    }
  });

  const deleteAllButton = document.querySelector(".delete-all-button");
  deleteAllButton.addEventListener("click", () => {
    const confirmDeleteAll = confirm(
      "Are you sure you want to delete all notes?"
    );
    if (confirmDeleteAll) {
      removeAllNotes();
      init();
    }
  });
}

export function handleArchiveNote() {
  const tableBody = document.querySelector("#notesTable tbody");

  tableBody.addEventListener("click", (event) => {
    const archiveButton = event.target.closest(".archive-button");
    const unArchiveButton = event.target.closest(".unarchive-button");

    if (archiveButton) {
      const noteId = archiveButton.getAttribute("data-note-id");

      currentNote = getNote(noteId);
      archiveNote(noteId);
      init();
    }

    if (unArchiveButton) {
      const noteId = unArchiveButton.getAttribute("data-note-id");

      currentNote = getNote(noteId);
      archiveNote(noteId);
      init();
    }
  });

  const archiveAllButton = document.querySelector(".archive-all-button");
  archiveAllButton.addEventListener("click", () => {
    const confirmArchiveAll = confirm(
      "Are you sure you want to archive all notes?"
    );
    if (confirmArchiveAll) {
      archiveAllNote();
      init();
    }
  });
}

export function init() {
  const notesData = getActiveNotes();

  const activeNotesRadio = document.querySelector("#activeNotes");
  const archivedNotesRadio = document.querySelector("#archivedNotes");
  if (activeNotesRadio.checked) {
    renderNotesTable(notesData);
  }
  if (archivedNotesRadio.checked) {
    renderArchivedNotesTable(getArchivedNotes());
  }
  renderSummaryTable();
}

export function saveNote() {
  const saveNoteButton = document.querySelector("#saveNote");

  saveNoteButton.addEventListener("click", () => {
    const noteName = document.querySelector("#note-name");
    const noteCategory = document.querySelector(".categories");
    const noteContent = document.querySelector("#note-content");

    const isFormValid = validateForm(noteName, noteCategory, noteContent);

    if (isFormValid) {
      if (currentNote) {
        const updatedNote = {
          name: noteName.value,
          category: noteCategory.value,
          content: noteContent.value,
        };
        console.log("edit");
        editNote(currentNote.id, updatedNote);
      } else {
        const newNote = {
          id: generateUUID(),
          name: noteName.value,
          created: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          category: noteCategory.value,
          content: noteContent.value,
          archived: false,
        };
        console.log("create");
        addNote(newNote);
      }

      modal.hide();
      init();
    }
    currentNote = null;
  });
}

export function clearNoteForm() {
  const noteName = document.querySelector("#note-name");
  const noteContent = document.querySelector("#note-content");
  noteName.value = "";
  noteContent.value = "";
}

function showCategories() {
  let selectCategories = document.querySelector(".categories");
  selectCategories.innerHTML = "";
  categories.map((item) => {
    const option = document.createElement("option");
    if (currentNote && item === currentNote.category) {
      option.setAttribute("selected", true);
    }
    option.textContent = item;
    selectCategories.appendChild(option);
  });
}
