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
const folder1 = new Folder({
    name: "folder1",
    folders: [],
    material: [],
});

const folder2 = new Folder({
    name: "folder2",
    folders: [],
    material: [],
});

folder1.folders.push(folder2);
folder1.save().then(() => {
    console.log("saved 1");
});
folder2.save().then(() => {
    console.log("saved 2");
});
console.log("done");
