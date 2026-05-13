#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  AddNewNote,
  removeAllNotes,
  findNotesByName,
  removeNoteById,
  getAllNotes,
} from "./notes.js";
import { listNotes } from "./utils.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  .command(
    "new <noteContent>",
    "Add a new note",
    (yargs) => {
      return yargs.positional("noteContent", {
        type: "string",
        description: "The content of the note to add",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await AddNewNote(argv.noteContent, tags);
      console.log("Note added: ", note);
    },
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to associate with the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description: "The search term to filter notes by",
      });
    },
    async (argv) => {
      const notes = await findNotesByName(argv.filter);
      if (notes.length > 0) {
        listNotes(notes);
      } else {
        console.log("No matching notes found");
      }
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      await removeNoteById(argv.id);
      console.log("Note removed successfully");
    },
  )
  .command(
    "web [port]", //optional port argument []
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        description: "port to bind on",
        default: 5000, //default value if not provided
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed successfully");
    },
  )
  .demandCommand(1, "You need to specify a command")
  .parse();
