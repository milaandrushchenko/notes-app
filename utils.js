export function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function parseDate(str) {
  let dates = str.match(
    /((0?[1-9]|[12]\d|3[01])[-\/.](0?[1-9]|1[0-2])[-\/.](\d{4}))|((0?[1-9]|1[0-2])[-\/.](0?[1-9]|[12]\d|3[01])[-\/.](\d{4}))/gm
  );
  if (dates !== null) {
    dates = dates.join(", ");
  } else {
    dates = "";
  }
  return dates;
}

export function getIcon(category) {
  let nameIcon;
  switch (category) {
    case "Task":
      nameIcon = "fa-cart-shopping";
      break;
    case "Idea":
      nameIcon = "fa-lightbulb";
      break;
    case "Random Thought":
      nameIcon = "fa-head-side-virus";
      break;
  }
  return nameIcon;
}

export function generateUUID() {
  let uuid = "";
  const characters = "abcdef0123456789";
  const length = 32;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uuid += characters[randomIndex];
  }

  // Додаємо дефіси у відповідних місцях, щоб отримати формат UUID
  uuid =
    uuid.substr(0, 8) +
    "-" +
    uuid.substr(8, 4) +
    "-" +
    uuid.substr(12, 4) +
    "-" +
    uuid.substr(16, 4) +
    "-" +
    uuid.substr(20);

  return uuid;
}

export function validateForm(noteName, noteCategory, noteContent) {
  if (!noteName.value || !noteCategory.value || !noteContent.value) {
    if (!noteName.value) noteName.classList.add("invalid");
    if (!noteCategory.value) noteCategory.classList.add("invalid");
    if (!noteContent.value) noteContent.classList.add("invalid");
    return false;
  }

  noteName.classList.remove("invalid");
  noteCategory.classList.remove("invalid");
  noteContent.classList.remove("invalid");
  return true;
}

export const modal = new bootstrap.Modal(
  document.getElementById("createNoteModal"),
  {}
);
