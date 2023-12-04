import express from "express"
import { Server } from "socket.io"
import { v4 as uuid } from "uuid"
import http from "http"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import path from "path"

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

let gamesInProgress = {}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let availableLetters = [...alphabet]
const gameState = {
    players: {},
    randomLetter: "",
    wordCatergories: [
        "name",
        "fruit",
        "country",
        "color",
        "car brands",
        "animal",
    ],
    timer: {
        duration: 60,
        current: 60
    },
    gameStatus: "pending" // "in-progress", "paused", "finished"
}


const createNewGame = (isAutoJoin) => {
    return {
        id: uuid(),
        playerOneSocket:null,
        playerTwoSocket:null,
        isAutoJoin,
    }
}

const getRandomLetter = () => {
    if (availableLetters.length === 0) {
        console.log("Game Over!")
    }

    const randomIndex = Math.floor(Math.random() * availableLetters.length)
    const randomLetter = availableLetters[randomIndex]
    availableLetters.splice(randomIndex, 1)
    return randomLetter
}

app.use(express.static(path.join(__dirname, "../frontend/dist/frontend")));
app.get("/", (req, res) => {
    res.sendFile(new URL('../frontend/dist/frontend/index.html', import.meta.url).pathname)
})

io.on("connection", (socket) => {
    console.log("A new player connected!", socket.id)
    socket.on('newPlayer', (username) => {
        
        socket.emit('catergories', gameState.wordCatergories);
        gameState.players[socket.id] = {
            username,
            score: 0
        }
      }
    )

    socket.on("disconnect", ()=>{
        delete gameState.players[socket.id]
        console.log("User disconnected")
    })
})

setInterval(() => {
    io.sockets.emit('state', gameState);
  }, 1000 / 60);
  
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})