import { categories } from "./data.js";
import {
  archiveNote,
  unarchiveNote,
  editNote,
  removeNote,
  addNote,
  getAllNotes,
  removeAllNotes,
} from "./notes.js";
import {
  generateUUID,
  getIcon,
  parseDate,
  truncateText,
  validateForm,
} from "./utils.js";

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
    contentCell.textContent = truncateText(note.content, 20); // Обмежимо до 30 символів

    row.appendChild(contentCell);

    const datesCell = document.createElement("td");
    datesCell.textContent = truncateText(parseDate(note.content), 20);
    row.appendChild(datesCell);

    // Додаємо комірку для кнопок редагування, видалення та архівації
    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.innerHTML =
      '<i class="fa-solid fa-xl fa-pen" style="color: #7a7a7a;"></i>';
    editButton.setAttribute("onclick", `editItem(${note.id})`);
    actionsCell.appendChild(editButton);

    const archiveButton = document.createElement("button");
    archiveButton.classList.add("btn");
    archiveButton.innerHTML =
      '<i class="fa-solid fa-xl fa-box-archive" style="color: #7a7a7a;"></i>';
    archiveButton.setAttribute("onclick", `archiveItem(${note.id})`);
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

export function createNewNote() {
  let btnCreateNote = document.querySelector(".create-note");

  let modal = new bootstrap.Modal(
    document.getElementById("createNoteModal"),
    {}
  );

  let selectCategories = document.querySelector(".categories");
  categories.map((item) => {
    const option = document.createElement("option");
    option.textContent = item;
    selectCategories.appendChild(option);
  });

  btnCreateNote.addEventListener("click", () => {
    modal.show();
  });

  const saveNoteButton = document.querySelector("#saveNote");

  saveNoteButton.addEventListener("click", () => {
    const noteName = document.querySelector("#note-name");
    const noteCategory = document.querySelector(".categories");
    const noteContent = document.querySelector("#note-content");

    const isFormValid = validateForm(noteName, noteCategory, noteContent);

    if (isFormValid) {
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
      };
      console.log(newNote);

      addNote(newNote);

      modal.hide();
      init();
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

export function renderArchivedNotesTable(archivedNotes) {}

export function renderSummaryTable(summaryData) {}

export function updateSummaryData(notes) {}

export function init() {
  const notesData = getAllNotes();

  renderNotesTable(notesData);

  updateSummaryData(notesData);
}
