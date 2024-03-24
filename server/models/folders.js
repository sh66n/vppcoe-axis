const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: String,
    folders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
        },
    ],
    material: [{}],
    year: Number,
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
