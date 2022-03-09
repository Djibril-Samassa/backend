const express = require("express");
const app = express();
const usersRouter = require("./routers/usersRouter")

app.use(express.json());
app.use("/users", usersRouter);

app.use("*", (err, req, res, next) => {
	res.send("errror");
});




app.listen(8000,() =>{
    console.log("Listening");
})