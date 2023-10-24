import express from "express"
import { Server } from "socket.io"
import { v4 as uuid } from "uuid"
import http from "http"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    pingInterval: 2000, 
    pingTimeout: 5000,
    cors: {
        origin: "*"
    }
})

let playersCount = 0
let gamesInProgress = {}

const createNewGame = (isAutoJoin) => {
    return {
        id: uuid(),
        players: {},
        numPlayers: 0,
        owner: null,
        isAutoJoin: isAutoJoin
    }
}

app.get("/", (req, res) => {
    res.sendFile("../frontend/dist/frontend/index.html")
})

io.on("connection", (socket) => {
    console.log("A new player connected!")
    socket.on("initUser", ({ username }) => {

        if (playersCount === 0) {
            console.log("NO USER ", playersCount)
            const newGame = createNewGame(true)
            gamesInProgress[newGame.id] = newGame
            newGame.players[socket.id] = { socket, player: {
                username,
                score: 0
            }}
            newGame.owner = socket
            
            newGame.owner.emit("initNumPlayers", newGame.id)
            playersCount++
            newGame.owner.emitt("waitingForPlayers", "Waiting for more players to join...")
        
        }
        else {
            console.log("SOME USER ", playersCount)
            let existingGame = Object.values(gamesInProgress)
            .find(game => game.isAutoJoin && game.owner && playersCount < game.numPlayers)
            
            if (existingGame) {
                    existingGame.players[socket.id] = socket
                    playersCount++
                    if (playersCount >= existingGame.numPlayers){
                        existingGame.isAutoJoin = false
                        numPlayers = 0
                        playersCount = 0

                        for (const player of existingGame.players){
                            player.socket.emit("gameStarting", "The game is starting. Please wait...")
                        }
                    }
                    else {
                        existingGame.players[socket.id].socket.emit("waitingForPlayers", "Waiting for more players to join...")
                    }

            }
            else{
                const newGame = createNewGame(true)
                gamesInProgress[newGame.id] = newGame
                newGame.players[socket.id] = { socket, player: {
                    username,
                    score: 0
                }}
                newGame.owner = socket
                
                newGame.owner.emit("initNumPlayers", newGame.id)
                playersCount++
                newGame.owner.emitt("waitingForPlayers", "Waiting for more players to join...")
            }

        }

        console.log(gamesInProgress)
    })

    socket.on("initNumPlayers", ({ nPlayers, gameId }) => {
        numPlayers = parseInt(nPlayers)
        const game = Object.values(gamesInProgress).find(game => game.id === gameId)

        game.numPlayers = nPlayers
    })

    socket.on("initGame", ({ nPlayers, gameId }) => {

    })


    socket.on("disconnect", (reason) => {
        console.log(reason)
        delete players[socket.id]
        io.emit("updatePlayers", players)
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})