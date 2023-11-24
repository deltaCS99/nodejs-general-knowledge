import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  username: string = '';

  constructor(private gameService: GameService){}

  ngOnInit(){
    this.username = this.gameService.getUsername();
  }
}
