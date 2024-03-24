const mongoose = require("mongoose");
const Material = require("./materials");

const folderSchema = new mongoose.Schema({
    name: String,
    folders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
        },
    ],
    materials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Material",
        },
    ],
    year: Number,
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
