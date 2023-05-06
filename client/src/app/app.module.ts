import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home-component/home-component.component';
import { ForumComponent } from './components/forum/forum.component';

import { RouterModule, Routes } from '@angular/router';


//Rutas
import { app_routing } from "./app.routes";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
