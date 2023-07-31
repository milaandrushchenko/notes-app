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
