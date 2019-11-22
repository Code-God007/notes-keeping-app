const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.underline.bold.magentaBright("Your Notes..."));
  notes.forEach(note => console.log(chalk.blueBright(note.title)));
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const readNote = title => {
  const notes = loadNotes();
  const read = notes.find(note => note.title === title);

  if (read) {
    console.log(chalk.bold.underline.blueBright(read.title) + ": ", read.body);
  } else {
    console.log(chalk.redBright.inverse("Note not found"));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note Added!"));
  } else {
    console.log(chalk.yellow.inverse("Note Title Already taken"));
  }
};

const removeNotes = title => {
  const notes = loadNotes();
  const removedNotes = notes.filter(note => note.title !== title);

  if (removedNotes.length < notes.length) {
    console.log(chalk.cyanBright.inverse("Note Removed!"));
    saveNotes(removedNotes);
  } else {
    console.log(chalk.red.inverse("No Note Found!"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = { addNote, removeNotes, listNotes, readNote };
