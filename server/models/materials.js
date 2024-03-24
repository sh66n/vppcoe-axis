const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
