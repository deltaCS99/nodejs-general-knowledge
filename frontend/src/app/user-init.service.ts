import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserInitService {
  private username: string = '';

  setUsername(username: string): void{
    this.username = username;
  }

  getUsername(): string{
    return this.username;
  }
}
