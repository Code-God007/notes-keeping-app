const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Add a Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Add Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  }
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
