import { expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertNoteIntoDb: jest.fn(),
  getDb: jest.fn(),
  saveDb: jest.fn(),
}));

const { insertNoteIntoDb, saveDb, getDb } = await import("../src/db.js");
const {
  AddNewNote,
  getAllNotes,
  removeNoteById,
  removeAllNotes,
  findNotesByName,
} = await import("../src/notes.js");

beforeEach(() => {
  insertNoteIntoDb.mockClear();
  getDb.mockClear();
  saveDb.mockClear();
});

describe("cli notes tests", () => {
  test("AddNewNote should insert a note and return the inserted note", async () => {
    const newNote = "Test note";
    const tags = ["hello", "welcome"];

    const noteObj = {
      id: Date.now(),
      tags: tags,
      content: newNote,
    };
    insertNoteIntoDb.mockResolvedValue(noteObj); // return promise
    const result = await AddNewNote(newNote, tags);
    expect(result.content).toEqual(noteObj.content) &&
      expect(result.tags).toEqual(noteObj.tags);
  });

  test("getAllNotes should return all notes from the database", async () => {
    const notes = [
      { id: Date.now(), content: "Note 1", tags: ["tag1"] },
      { id: Date.now(), content: "Note 2", tags: ["tag2"] },
    ];
    const db = { notes };
    getDb.mockResolvedValue(db);
    const result = await getAllNotes();
    expect(result).toEqual(notes);
  });

  test("removeNoteById should remove the note with the given id", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: ["tag1"] },
      { id: 2, content: "Note 2", tags: ["tag2"] },
    ];
    saveDb.mockResolvedValue();
    const result = await removeNoteById(3);
    expect(result).toBeUndefined();
  });
  test("findNotesByName should return the notes that match the search query", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: ["tag1"] },
      { id: 2, content: "Note 2", tags: ["tag2"] },
    ];
    const result = await findNotesByName("Note 1");
    expect(result.content).toEqual([notes[0]].content);
  });
  it("removeAllNotes should remove all notes from the database", async () => {
    const notes = [
      { id: 1, content: "Note 1", tags: ["tag1"] },
      { id: 2, content: "Note 2", tags: ["tag2"] },
    ];
    saveDb.mockResolvedValue();
    const result = await removeAllNotes();
    expect(result).toBeUndefined();
  });
});
