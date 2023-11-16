import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const players = []
const topics = []
let numPlayers = 0
let gameIsOver = false
let turn = "Player 1"
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY".split("")
let currentRound = 1

const displayPrompt = (string) => {
    return new Promise((resolve, reject) => {
        rl.question(string,resolve)
    })
}

const gameSetup = async () => {

    numPlayers = await displayPrompt("Enter the number of players: ")

    for (let i = 0; i < numPlayers; i++) {
        let name = await displayPrompt(`Enter the name for Player ${i+1}: `)
        players.push({ name, score: 0})
    }

    console.log("\n**********************************")
    console.log("Enter the topics you interested in")
    console.log("Enter 'done' when finished\n")

    while(true){
        let topic = await displayPrompt(`Enter Topic number ${topics.length + 1}: `)
        if(topic === "done"){
            console.log("Players ", players)
            console.log("Topics", topics)
            break;
        }
        topics.push(topic)
    }

}


const startGame = async () => {
    while (!gameIsOver){
        await gameSetup()
    }
}


startGame()