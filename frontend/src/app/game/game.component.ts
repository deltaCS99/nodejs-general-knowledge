import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { GameState } from '../game-state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  username: string = ''
  catergories: string[]= []
  gameState: GameState = {
    players: {},
    randomLetter: '',
    wordCategories: [],
    timer: {
      duration: 0,
      current: 0
    },
    gameStatus: 'pending'
  }

  constructor(private gameService: GameService){
    gameService.listen("gameState").subscribe((gameState: GameState) => {
      this.gameState = gameState
      console.log(this.gameState)
    })
  }

  ngOnInit(){
    this.username = this.gameService.getUsername();
    this.catergories = this.gameService.getCatergories()
  }

  isButtonDisabled(): boolean {
    return this.gameState.gameStatus !== 'in-progress';
  }

  generateRandomLetter(): void {
    this.gameService.generateRandomLetter();
  }
}
