const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const users = [
    {
        username:"Djibril",
        email:"dsamassa.pro@gmail.com",
        age:20,
        ville:"Paris",
    },
    {
        username:"Arthur",
        email:"a.melo@yahoo.com",
        age:29,
        ville:"Rio de Janeiro",
    },
    {
        username:"Eden",
        email:"e.hazard@gmail.com",
        age:28,
        ville:"Bruxelles",
    },
]


router.get("/",(req,res) => {
    res.send(users)
})

router.post("/",(req,res) =>{
    users.push(req.body),
    res.send(users)
})

router.get("/:username",(req,res) =>{
    const user = users.find((usr) =>{
        return usr.username === req.params.username
    })
    res.send(user);
})



module.exports = router;