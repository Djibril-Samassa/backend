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



module.exports = router;