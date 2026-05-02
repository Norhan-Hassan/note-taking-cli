#!/usr/bin/env node

const note = process.argv[2];

const newNote = {
  id: Date.now(),
  content: note,
};

console.log(newNote);
