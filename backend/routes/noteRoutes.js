const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getNotes);
router.post("/", auth, createNote);
router.post("/:id", auth, deleteNote);

module.exports = router;