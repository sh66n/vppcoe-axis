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
    const { year, isNested } = req.query;
    const filteredFolders = await Folder.find({ year, isNested });
    res.json({
        filteredFolders: filteredFolders,
    });
});

app.post("/api/folders", async (req, res) => {
    const newFolder = await Folder.create(req.body);
    if (req.body.isNested === true) {
        const { parentId } = req.body;
        const parentFolder = await Folder.findById(parentId);
        if (parentFolder) {
            newFolder.parentFolder.push(parentFolder);
            newFolder.save();

            parentFolder.childFolders.push(newFolder);
            parentFolder.save();
        }
    }
    res.status(200).json({
        newFolder,
    });
});

app.get("/api/folders/:id", async (req, res) => {
    const { id } = req.params;
    const currentFolder = await Folder.findById(id).populate("childFolders");
    if (currentFolder) {
        if (currentFolder.childFolders.length > 0) {
            const childFolders = currentFolder.childFolders;
            res.json({
                childFolders,
                hasChildren: true,
            });
        } else {
            res.json({
                hasChildren: false,
            });
        }
    }
});

app.post("/api/folder", async (req, res) => {
    const { id } = req.body;
    const requiredFolder = await Folder.findById(id)
        .populate("childFolders")
        .populate("materials");
    res.send(requiredFolder);
});

app.patch("/api/folders/:id", async (req, res) => {
    const { id } = req.params;
    const updatedFolder = await Folder.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.json({
        updatedFolder,
    });
});

app.delete("/api/folders/:id", async (req, res) => {
    const { id } = req.params;
    const deletedFolder = await Folder.findByIdAndDelete(id);
    res.json({
        status: "success",
        deletedFolder,
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
    destinationFolder?.materials.push(newMaterial);
    res.json({
        destinationFolder,
        newMaterial,
    });
    await destinationFolder.save();
});

app.listen(port, () => {
    console.log(`Servers online at port ${port}`);
});
