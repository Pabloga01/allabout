import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';

//Rutas
import { app_routing } from "./app.routes";
import { PublicationComponent } from './components/publication/publication.component';
import { LoginComponent } from './login/login.component';

import { BrowserModule } from '@angular/platform-browser';

//material 
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicationsUserListComponent } from './components/publications-user-list/publications-user-list.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationComponent,
    LoginComponent,
    PublicationsUserListComponent,
    NavHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    app_routing,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
