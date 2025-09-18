const Note = require("../models/note");

module.exports.getNotes = async(req, res) => {

    if (!req.userId) {
        console.log("user not found");
        return res.status(401).json({ message: "Unauthorized User" });
    } else {

        const notes = await Note.find({ userId: req.userId });
        return res.json({ message: "All notes", notes: notes });
    }
};

module.exports.createNote = async(req, res) => {

    const { newNote } = req.body;
    const note = new Note({...newNote, userId: req.userId });
    await note.save();
    return res.json({ message: "Notes add Successfully" });
};

module.exports.deleteNote = async(req, res) => {

    if (!req.params.id) {

        return res.status(401).json({ message: "Id is required" });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
};