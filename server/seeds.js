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
        name: "SEM-I",
        year: 1,
    },
    {
        name: "SEM-II",
        year: 1,
    },
    {
        name: "SEM-I",
        year: 2,
    },
    {
        name: "SEM-II",
        year: 2,
    },
];

Folder.insertMany(seedData).then((data) => {
    console.log(data);
});
