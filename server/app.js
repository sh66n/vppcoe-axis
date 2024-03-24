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

app.get("/api/folders", async (req, res) => {
    const allFolders = await Folder.find({});
    res.send(allFolders);
});

app.post("/api/folders", async (req, res) => {
    const newFolder = await Folder.create(req.body);
    res.status(200).json({
        newFolder,
    });
});

app.post("/api/folder", async (req, res) => {
    const { id } = req.body;
    const requiredFolder = await Folder.findById(id).populate("folders");
    res.send(requiredFolder);
});

app.post("/api/files", upload.single("avatar"), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
    console.log(`Servers online at port ${port}`);
});
