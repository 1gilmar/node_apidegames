const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))

//conferter o corpo da requisicao para json
app.use(bodyParser.json())


//bando de dados simulador
var DB = {
    games: [
        {
            nome: "metal gear",
            data: 1998,
            empresa: "konami"
        },
        {
            nome: "residente evil",
            data: 1995,
            empresa: "capcon",
        },
        {
            nome: "tomb raider",
            data: 1995,
            empresa: "enix"
        },
        {
            nome: "minecraft",
            data: 2009,
            empresa: "mojang"
        }
    ]
}


app.get ("/", (req, res)=>{
    req.res("test primeira rota")
})


app.listen(3005, ()=>{
    console.log("api rodando...")
})