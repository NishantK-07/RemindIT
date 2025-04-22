const express = require("express");
const {
  createProblem,
  getAllProblems,
  deleteProblem,
  updateProblem
} = require("../controller/NotesController");
const {protecdrouteMiddleware}=require("../controller/AuthController")
const Notesrouter = express.Router();

Notesrouter.post("/add", createProblem);

Notesrouter.get("/",protecdrouteMiddleware, getAllProblems);

Notesrouter.put("/:id", updateProblem);

Notesrouter.delete("/:id", deleteProblem);

module.exports = Notesrouter;
