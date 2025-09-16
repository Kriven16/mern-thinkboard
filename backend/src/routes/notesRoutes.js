import express from "express";
import {
  createNote,
  deleteNote,
  getAllNodes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNodes);
router.get("/:id",getNoteById)

router.post("/", createNote);
router.put("/:id", updateNote);


router.delete("/:id", deleteNote);

export default router;
