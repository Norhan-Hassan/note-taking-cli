import fs from "node:fs/promises";

const Db_Path = new URL("../db.json", import.meta.url).pathname;

//const DB_PATH = path.join("..", "db.json");

//like ORM

export const getDb = async () => {
  const db = await fs.readFile(Db_Path, "utf-8"); // read file and return string
  return JSON.parse(db); //return javascript object{}
};

export const saveDb = async (db) => {
  await fs.writeFile(
    Db_Path,
    JSON.stringify(db, null, 2), //return string from javascript object {}=>"{obj}"
    "utf-8",
  );
  return db;
};

export const insertNoteIntoDV = async (note_content) => {
  const db = await getDb();
  db.notes.push(note_content);
  await saveDb(db);
  return note_content;
};
