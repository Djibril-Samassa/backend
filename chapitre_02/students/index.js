const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
	path: "../config.env",
});
const { Pool } = require("pg")
app.use(express.json());
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.use((req, res, next) => {
	console.log("requête reçue");
	next();
});

const students = [
	{
		id: 1,
		name: "Nicolas",
	},
	{
		id: 2,
		name: "Anita",
	},
	{
		id: 3,
		name: "Djibril",
	},
];

app.get("/", (req, res) =>{
    res.send(students);
})

app.get("/students", (req, res) =>{
    res.send(students);
})

app.post("/students", (req,res) => {
    students.push({
        id: students.length + 1,
        name: req.body.name,
    });
    res.send(students)
})



app.listen(8000, () =>{
    console.log("Listening");
})