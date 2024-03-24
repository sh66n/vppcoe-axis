if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/timeline")
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });

const multer = require("multer");
const storage = require("./cloudinary");
const upload = multer({ storage });
const bodyParser = require("body-parser");

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const Folder = require("./models/folders");
const Material = require("./models/materials");

app.get("/api/folders", async (req, res) => {
    const allFolders = await Folder.find({});
    res.send(allFolders);
});

app.post("/api/folder", async (req, res) => {
    const { id } = req.body;
    const requiredFolder = await Folder.findById(id)
        .populate("folders")
        .populate("material");
    res.send(requiredFolder);
});
app.post("/api/folders", async (req, res) => {
    const newFolder = await Folder.create(req.body);
    res.status(200).json({
        newFolder,
    });
});

app.post("/api/material", async (req, res) => {
    const { id } = req.body;
    const requiredMaterial = await Material.findById(id);
    res.send(requiredMaterial);
});
app.post("/api/materials", upload.single("content"), async (req, res, next) => {
    const { title, destinationFolderId } = req.body;
    const newMaterial = new Material({
        title,
        content: req.file.path,
    });
    await newMaterial.save();
    const destinationFolder = await Folder.findById(destinationFolderId);
    destinationFolder?.material.push(newMaterial);
    res.json({
        destinationFolder,
        newMaterial,
    });
    await destinationFolder.save();
});

app.listen(port, () => {
    console.log(`Servers online at port ${port}`);
});
