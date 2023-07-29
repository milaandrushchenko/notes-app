const notesData = [
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
  {
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
  },
];

export function getAllNotes() {
  return notesData;
}

export function addNote(note) {
  // Реалізуйте додавання запису тут
}

export function editNote(id, updatedNote) {
  // Реалізуйте редагування запису тут
}

export function archiveNote(id) {
  // Реалізуйте архівацію запису тут
}

export function unarchiveNote(id) {
  // Реалізуйте розархівацію запису тут
}

export function removeNote(id) {
  // Реалізуйте видалення запису тут
}

export default notesData;
