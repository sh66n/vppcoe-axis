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
        isNested: true,
    },
    {
        name: "EM-I",
        year: 1,
        isNested: true,
    },
    {
        name: "EM",
        year: 1,
        isNested: true,
    },
    {
        name: "EC-I",
        year: 1,
        isNested: true,
    },
    {
        name: "BEE",
        year: 1,
        isNested: true,
    },
];

const addNestedFolders = async () => {
    const folderToPush = await Folder.findById("660311cb973172a228de5826");
    const folderToBePushedUpon = await Folder.findById(
        "660310e88232d772d55ceaf7"
    );
    folderToBePushedUpon?.folders.push(folderToPush);
    await folderToBePushedUpon?.save();
    console.log("done");
};

const createNestedFolders = async () => {
    const folders = await Folder.insertMany(seedData);
    console.log("done");
};
addNestedFolders();
// Folder.deleteMany({}).then(() => {
//     console.log("deleted");
// });
