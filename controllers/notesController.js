const { generateId } = require("../helpers");

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
  return res.json(notes);
}

function saveNote(request, response) {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(notes),
  };

  notes = notes.concat(note);

  response.json(note);
}

function getNoteById(request, response) {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }

  response.json(note);
}

function toggleImportant(request, response) {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    note.important = !note.important;
  } else {
    response.status(404).end();
  }

  response.json(note);
}

function deleteNote(request, response) {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
}

module.exports = {
  getNotes,
  saveNote,
  getNoteById,
  toggleImportant,
  deleteNote,
};
