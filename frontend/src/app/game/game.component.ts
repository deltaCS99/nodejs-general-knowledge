import { Component } from '@angular/core';
import { UserInitService } from '../user-init.service';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  username: string = '';

  constructor(private userService: UserInitService){}

  ngOnInit(){
    this.username = this.userService.getUsername();
  }
}
