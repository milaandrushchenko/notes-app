import { generateUUID } from "./utils.js";

export const notesData = [
  {
    id: generateUUID(),
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
    archived: false,
  },
  {
    id: generateUUID(),
    name: "Random idea",
    created: "May 5, 2021",
    category: "Idea",
    content: "Invent a new gadget",
    archived: false,
  },
  {
    id: generateUUID(),
    name: "The dentist",
    created: "June 10, 2021",
    category: "Task",
    content:
      "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021.",
    archived: false,
  },
  {
    id: generateUUID(),
    name: "Book recommendation",
    created: "July 15, 2021",
    category: "Random Thought",
    content: "Read 'To Kill a Mockingbird'",
    archived: false,
  },
  {
    id: generateUUID(),
    name: "Creative project",
    created: "August 2, 2021",
    category: "Idea",
    content: "Start a blog",
    archived: false,
  },
  {
    id: generateUUID(),
    name: "Birthday gift",
    created: "September 9, 2021",
    category: "Task",
    content: "Buy a present for a friend",
    archived: true,
  },
  {
    id: generateUUID(),
    name: "Inspirational quote",
    created: "October 12, 2021",
    category: "Random Thought",
    content:
      "The future belongs to those who believe in the beauty of their dreams.",
    archived: false,
  },
];

export const categories = ["Task", "Random Thought", "Idea"];
