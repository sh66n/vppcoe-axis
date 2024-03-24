const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/timeline")
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });

const Folder = require("./models/folders");

const seedData = [
    {
        name: "EP-I",
        year: 1,
    },
];

const addNestedFolders = async () => {
    const seedData = [];
    const folderToPush = await Folder.findById("6600825ab5eac93efa6ce2e1");
    const folderToBePushedUpon = await Folder.findById(
        "6600748f5abd94e4c3982789"
    );
    folderToBePushedUpon?.folders.push(folderToPush);
    await folderToBePushedUpon?.save();
    console.log("done");
};

const createNestedFolders = async () => {
    const folders = await Folder.insertMany(seedData);
};
addNestedFolders();
