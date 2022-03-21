const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "public/uploads/" });

const app = express();

app.use(express.static("public"));

app.post("/image", upload.single("image"), (req, res) => {
	fs.renameSync(
		req.file.path,
		path.join(req.file.destination, req.file.originalname)
	);

	res.send("Image received");
});

app.post("/user", upload.single("profileimage"), (req, res) =>{
    fs.renameSync(
		req.file.path,
		path.join(req.file.destination, req.file.originalname)
	);
    res.send("yo")
});

app.listen(8000, ()=>
    console.log("Listening")
)
/*Yo*/