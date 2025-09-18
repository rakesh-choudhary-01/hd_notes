const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Note", noteSchema);