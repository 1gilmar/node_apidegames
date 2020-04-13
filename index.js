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
            id: 1,
            nome: "metal gear",
            data: 1998,
            empresa: "konami"
        },
        {
            id: 2,
            nome: "residente evil",
            data: 1995,
            empresa: "capcon",
        },
        {
            id: 3,
            nome: "tomb raider",
            data: 1995,
            empresa: "enix"
        },
        {
            id: 4,
            nome: "minecraft",
            data: 2009,
            empresa: "mojang"
        }
    ]
}

//retorna todas as tebelas
app.get("/", (req, res) =>{
    res.json(DB)
})

app.get("/games", (req, res)=>{  
    res.statusCode = 200 
    res.json(DB.games)
})

app.get("/game/:id", (req, res)=>{
    const {id} = req.params

    if(isNaN(id)){
        res.sendStatus(400) //nao e um numero
    }else{
        const game = DB.games.find(g => g.id == parseInt(id))
    
        if(game != undefined){
            res.json(game)
        }else{
            res.send("jogo nao encontrado")
        }

    }

})


app.post("/games", (req, res)=>{
    const {nome, data, empresa} = req.body

    const game = {
        nome,
        data,
        empresa
    }

    DB.games.push(game)

    res.json(DB.games)
})

app.delete("/game/:id", (req, res)=>{
    const {id} = req.params

    if(isNaN(id)){
        res.sendStatus(400) //nao e um numero
    }else{
        const index = DB.games.findIndex(g => g.id == parseInt(id))

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }

    }

})

app.put("/game/:id", (req, res)=>{
    const {id} = req.params

    if(isNaN(id)){
        res.sendStatus(400) //nao e um numero
    }else{
        const game = DB.games.find(g => g.id == parseInt(id))

        if(game  != undefined){
            const {nome, data, empresa} = req.body

            if(nome != undefined){    
                game.nome = nome
            }

            if(data != undefined){
                game.data = data
            }

            if(empresa != undefined){
                game.empresa = empresa
            }
            console.log (game)

            res.sendStatus(200)

        }else{            
            res.sendStatus(404)
        }

    }
})

app.listen(3005, ()=>{
    console.log("api rodando...")
})