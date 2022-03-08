const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
	console.log("requête reçue");
	next();
});


app.listen(8000, () =>{
    log("Listening")
})