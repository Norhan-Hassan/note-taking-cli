# NoteTaker

A simple CLI tool to manage your notes from the command line. It is built on `yargs` ^18.0.0 for CLI parsing and command handling, and it lets you create, search, and organize notes with tags, all stored in a local JSON database.

## Features

- **Add Notes** - Create new notes with optional tags
- **Search Notes** - Find notes by keyword
- **View Notes** - List all saved notes
- **Remove Notes** - Delete notes by ID or clear all notes
- **Web Interface** - Launch a web interface to view notes (configurable port)

## Installation

```bash
npm install
npm link
```

The `npm link` command makes the `notetaker` command globally available from your terminal , and you will not need to make it every time you use this code.

## Usage

```bash
# Add a new note
notetaker new "Your note content" --tags important,work

# View all notes
notetaker all

# Search notes
notetaker find "keyword"

# Remove a note by ID
notetaker remove 1234567890

# Launch web interface on port 5000
notetaker web

# Launch web interface on custom port
notetaker web 3000

# Remove all notes
notetaker clean
```

## Data Storage

Notes are stored in a local `db.json` file with the following structure:

```json
{
  "notes": [
    {
      "id": 1234567890,
      "content": "Note content",
      "tags": "tag1,tag2"
    }
  ]
}
```
