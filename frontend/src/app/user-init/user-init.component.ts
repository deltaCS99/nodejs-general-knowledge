import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user-init',
  templateUrl: './user-init.component.html',
  styleUrls: ['./user-init.component.css']
})
export class UserInitComponent {
  @Input({ required: true }) username!: string;

  constructor(private router: Router, private gameService: GameService) {}

  submitUsername(): void {
    this.gameService.setUsername(this.username);
    this.router.navigate(['/game']);
  }

}
