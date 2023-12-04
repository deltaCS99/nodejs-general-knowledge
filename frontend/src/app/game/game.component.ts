import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { GameState } from '../game-state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  username: string = '';
  catergories: string[]= []

  constructor(private gameService: GameService){
  }

  ngOnInit(){
    this.username = this.gameService.getUsername();
    this.catergories = this.gameService.getCatergories()
    console.log(this.catergories)
  }
}
