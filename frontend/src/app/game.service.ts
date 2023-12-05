import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { GameState } from './game-state';

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

  listen(eventName: string): Observable<GameState> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: GameState) => {
        subscriber.next(data);
      });
    });
  }

  getCatergories(): string[]{
    let catergories: string[]= []
    
    this.socket.on('catergories', (wordCatergories) => {
      for (let catergory of wordCatergories) {
        catergories.push(catergory)
      }
    })

    return catergories;
  }

  generateRandomLetter(): void{
    this.socket.emit("generateLetter");
  }
}
