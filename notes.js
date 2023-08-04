import { categories, notesData } from "./data.js";

export function getActiveNotes() {
  return notesData.filter((note) => !note.archived);
}

export function getArchivedNotes() {
  return notesData.filter((note) => note.archived);
}

export function addNote(note) {
  notesData.push(note);
}

export function editNote(id, updatedNote) {
  const index = notesData.findIndex((note) => note.id === id);

  if (index !== -1) {
    notesData[index] = {
      ...notesData[index],
      ...updatedNote,
    };
  } else {
    console.log("Note with the specified id not found.");
  }
}

export function getNote(id) {
  let note = notesData.find((note) => note.id == id);
  return note;
}

export function archiveNote(id) {
  const noteIndex = notesData.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    notesData[noteIndex].archived = !notesData[noteIndex].archived;
  }
}

export function archiveAllNote() {
  notesData.map((note) => {
    note.archived = true;
  });
}

export function unarchiveNote(id) {
  const noteIndex = notesData.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    notesData[noteIndex].archived = false;
  }
}

export function removeNote(id) {
  let noteDel = notesData.find((note, index) => note.id == id);
  let index = notesData.indexOf(noteDel);
  notesData.splice(index, 1);
}

export function removeAllNotes() {
  notesData.splice(0, notesData.length);
}

export function getCategoryStats() {
  const categoryStats = {};

  notesData.forEach((note) => {
    const category = note.category;
    if (categoryStats.hasOwnProperty(category)) {
      categoryStats[category].totalNotes += 1;
      if (note.archived) {
        categoryStats[category].archivedNotes += 1;
      } else {
        categoryStats[category].activeNotes += 1;
      }
    } else {
      categoryStats[category] = {
        totalNotes: 1,
        activeNotes: note.archived ? 0 : 1,
        archivedNotes: note.archived ? 1 : 0,
      };
    }
  });

  return categoryStats;
}
