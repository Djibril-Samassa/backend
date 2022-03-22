const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
	path: "../config.env",
});
const { Pool } = require("pg")
app.use(express.json());
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });


app.get("/", async(req, res) =>{
    let students;
	try{	
		students = await Postgres.query("SELECT * FROM students")
	} catch(err){
		console.log(err);
		return res.status(400).json({
			message: "An error Happened"
		})
	}

	res.json(students.rows)
})

app.get("/students/:id", async(req, res) =>{
    let student;
	try{
		student= await Postgres.query("SELECT * FROM students WHERE id=$1",[req.params.id]);
	} catch(err){
		console.log(err);
		return res.status(400).json({
			message: "An error happened"
		})
	}

	res.send(student.rows)
})

app.post("/students", async(req,res) => {
    let postStudent;
	try{postStudent= await Postgres.query("INSERT INTO students(name, city, age) VALUES($1, $2, $3)",
	[req.body.name, req.body.city, req.body.age]);
	}catch(err){
		console.log(err);
		return res.status(400).json({
			message: "An error happened"
		})
	}

	let displayStudents;
	try{	
		displayStudents = await Postgres.query("SELECT * FROM students")
	} catch(err){
		console.log(err);
		return res.status(400).json({
			message: "An error Happened"
		})
	}

	res.send(displayStudents.rows)
})



app.listen(8000, () =>{
    console.log("Listening");
})