import { saveDb, getDb, insertNoteIntoDb } from "./db.js";

export const AddNewNote = async (note_content, tags = []) => {
  const newNote = {
    id: Date.now(),
    content: note_content,
    tags: tags,
  };
  await insertNoteIntoDb(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDb(); // get the notes immediately not anything else
  return notes;
};

export const findNotesByName = async (note_search) => {
  const { notes } = await getDb();
  const notesFiltered = notes.filter(
    (note) => note.content.toUpperCase().includes(note_search.toUpperCase()), // include not smart to match the reversed words or letters
  );
  return notesFiltered;
};

export const removeAllNotes = async () => await saveDb({ notes: [] });

export const removeNoteById = async (id) => {
  //immutable way
  const { notes } = await getDb();
  const matchingNotes = notes.filter((note) => note.id === id);
  //avoid undefiened
  if (matchingNotes) {
    const newNotes = notes.filter((note) => note.id !== id); // make a new copy
    await saveDb({ notes: newNotes });
  }
};
