const express = require('express');
const dotenv = require('dotenv');
dotenv.config({
    path:"./config.env"
})
const {Pool} = require("pg")
const app = express();
app.use(express.json())

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get("/authors", async (req, res) => {
	let authors;
	try {
		authors = await Postgres.query("SELECT * FROM authors");
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}

	res.json(authors.rows);
});


app.get("/authors/:id",async (req,res,) =>{
    let author;
    try{
        author = await Postgres.query("SELECT * FROM authors WHERE id=$1",[req.params.id]);
    } catch (err){
        console.log(err);

        return res.status(400).json({
            message: "An error happened"
        })
    }
    res.json(author.rows);
})

app.get("/authors/:id/books", async (req, res) =>{
    let author_books;
    try{
        author_books = await Postgres.query("SELECT books FROM authors WHERE id=$1",[req.params.id]);
    } catch (err){
        console.log(error);

        return res.status(400).json({
            message: "An error happened"
        })
    }
    res.json(author_books.rows)
})



app.listen(8000, ()=>{
    console.log("Listening");
})