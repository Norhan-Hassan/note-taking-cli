# NoteTaker

A simple CLI tool to manage your notes from the command line. It uses `yargs` for CLI parsing and command handling, and it lets you create, search, and organize notes with tags, all stored in a local JSON database (`db.json`).

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

The `npm link` command makes the `notetaker` command globally available from your terminal.

### Run tests

```bash
npm test
```

## Usage

```bash
# Add a new note (use `-t` or `--tags` for comma-separated tags)
notetaker new "Your note content" --tags important,work

# or using alias
notetaker new "Your note content" -t important,work

# View all notes
notetaker all

# Search notes
notetaker find "keyword"

# Remove a note by ID
notetaker remove 1234567890

# Launch web interface (default port 5000)
notetaker web

# Launch web interface on custom port
notetaker web 3000

# Remove all notes
notetaker clean
```

## Data Storage

Notes are stored in a local `db.json` file. Each note has an `id`, `content`, and `tags` (an array of strings). Example:

```json
{
  "notes": [
    {
      "id": 1234567890,
      "content": "Note content",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

Notes about the implementation:

- Tags are stored as an array (`tags: ["a","b"]`) and are provided on the CLI as a comma-separated string (e.g. `--tags "a,b"`).
- The web interface uses port `5000` by default and will open your browser when launched.
