if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/axis")
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });

const multer = require("multer");
const storage = require("./cloudinary");
const upload = multer({ storage });

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post("/files", upload.single("avatar"), function (req, res, next) {
    res.json(req.file);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
    console.log(`Servers online at port ${port}`);
});
