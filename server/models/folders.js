const mongoose = require("mongoose");
const Material = require("./materials");

const folderSchema = new mongoose.Schema({
    name: String,
    childFolders: [
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
    isNested: Boolean,
    parentFolder: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
        },
    ],
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
