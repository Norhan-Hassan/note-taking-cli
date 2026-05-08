#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
      console.log(`Adding note: ${argv.noteContent}`);
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
    async (argv) => {},
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
    async (argv) => {},
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
    async (argv) => {},
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
    async (argv) => {},
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {},
  )
  .demandCommand(1, "You need to specify a command")
  .parse();
