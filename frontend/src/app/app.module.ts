import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserInitComponent } from './user-init/user-init.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    UserInitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ GameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
