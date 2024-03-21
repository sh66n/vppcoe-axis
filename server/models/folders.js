const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: String,
    content: [{}],
});

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
