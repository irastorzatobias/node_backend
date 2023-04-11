const Note = require("../models/note");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

function getNotes(req, res) {
  return Note.find({}).then((notes) => {
    res.json(notes);
  });
}

function saveNote(request, response) {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
}

function getNoteById(request, response) {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
}

function toggleImportant(request, response) {
  Note.findById(request.params.id).then((note) => {
    note.important = !note.important;

    note.save().then((modifiedNote) => {
      response.json(modifiedNote);
    });
  });
}

function deleteNote(request, response) {
  Note.deleteOne({ id: request.params.id }).then((noteDeleted) => {
    response.json(noteDeleted);
  });
}

module.exports = {
  getNotes,
  saveNote,
  getNoteById,
  toggleImportant,
  deleteNote,
};
