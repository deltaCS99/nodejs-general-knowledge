import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket = io('http://localhost:8080');
  private username: string = '';

  constructor() { }

  setUsername(username: string): void{
    this.username = username;
    this.socket.emit('newPlayer', this.username);
  }

  getUsername(): string{
    return this.username;
  }

  getCatergories(): string[]{
    let catergories: string[]= []
    
    this.socket.on('state', (gameState) => {
      for (let catergory in gameState.wordCatergories) {
        catergories.push(catergory)
      }
    }

    return catergories;
  }
}
