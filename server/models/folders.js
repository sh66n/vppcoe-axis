const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: String,
    folders: [{}],
    material: [{}],
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
