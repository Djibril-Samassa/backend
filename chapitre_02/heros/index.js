const express = require("express");
const app = express();

app.use(express.json());

app.use(function debug (req, res, next,) {
    console.log("Debug");
    next();
})

const superHeroes = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricity", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]

app.get("/", (req, res) => {
    res.send(superHeroes)
})

app.get("/heroes/:name", (req, res) => {
    const heroInfo = superHeroes.find((hero) =>{
        return hero.name === req.params.name
    })
    res.send(heroInfo)
})

app.get("/heroes/:name/powers", (req, res) => {
    const heroInfo = superHeroes.find((hero) =>{
        return hero.name === req.params.name
    })
    res.send(heroInfo.power.join(","))
})

app.post("/heroes", (req, res) => {
    superHeroes.push({
        name: req.body.name
    })
    res.send(superHeroes)
})

app.listen(8000, () => console.log("Listening..."))
