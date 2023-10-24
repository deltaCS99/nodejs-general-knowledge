import socketIoClient from "socket.io-client"
import * as readline from "node:readline/promises"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = socketIoClient("http://127.0.0.1:8080")
socket.on("game setup", (data) => {
    console.log("Message received")
    console.log(data)
})