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
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})