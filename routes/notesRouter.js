const express = require("express");
const router = express.Router();
const {
  getNotes,
  saveNote,
  getNoteById,
  toggleImportant,
  deleteNote,
} = require("../controllers/notesController");

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", saveNote);
router.put("/:id", toggleImportant);
router.delete("/:id", deleteNote);

module.exports = { router };
