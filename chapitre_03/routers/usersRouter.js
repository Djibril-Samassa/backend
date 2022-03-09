const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const schema = Joi.object({
	username: Joi.string().min(4).required(),
	age: Joi.number().min(10).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    ville: Joi.string().required(),
});

const users = [
    {
        username:"Djibril",
        email:"dsamassa.pro@gmail.com",
        ville:"Paris",
        age:20,
        id:1,
    },
    {
        username:"Arthur",
        email:"a.melo@yahoo.com",
        age:29,
        ville:"Rio de Janeiro",
        id:2,
    },
    {
        username:"Eden",
        email:"e.hazard@gmail.com",
        age:28,
        ville:"Bruxelles",
        id:3,
    },
]


router.get("/",(req,res) => {
    res.send(users)
})

router.post("/",(req,res) =>{
    const user = req.body;
    const validationResult = schema.validate(user);
    if (validationResult.error) {
		return res.status(400).json({
			message: validationResult.error,
		});
	}
    users.push(user),
    res.send(users)
})

router.get("/:username",(req,res) =>{
    const user = users.find((usr) =>{
        return usr.username === req.params.username
    })
    res.send(user);
})

router.get("/id/:id", (req,res) =>{
    const userInfo = users.find((user) =>{
        return user.id.toString() === req.params.id
    })
    res.send(userInfo)
})

router.get("/email/:email", (req,res) =>{
    const userInfo = users.find((user) =>{
        return user.email === req.params.email
    })
    res.send(userInfo)
})

module.exports = router;