import { archiveNote, unarchiveNote, editNote, removeNote } from "./notes.js";
import { getIcon, parseDate, truncateText } from "./utils.js";

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
    deleteButton.classList.add("btn");
    deleteButton.innerHTML =
      '<i class="fa-solid fa-xl fa-trash" style="color: #7a7a7a;"></i>';
    deleteButton.setAttribute("onclick", `deleteItem(${note.id})`);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    // Додаємо рядок до тіла таблиці
    tableBody.appendChild(row);
  });
}

export function renderArchivedNotesTable(archivedNotes) {}

export function renderSummaryTable(summaryData) {}

export function updateSummaryData(notes) {}
