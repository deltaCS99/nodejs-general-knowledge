import { Player } from "./player";
import { Timer } from "./timer";

export interface GameState {
    players: { [key: string]: Player }; // Assuming players is an object with string keys
    randomLetter: string;
    wordCategories: string[];
    timer: Timer;
    gameStatus: "pending" | "in-progress" | "paused" | "finished";
}
