import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

//Rutas
import { app_routing } from "./app.routes";
import { PublicationComponent } from './components/publication/publication.component';
import { LoginComponent } from './components/login/login.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';


//material 
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationComponent,
    LoginComponent,
    NavHeaderComponent,
    PublicationListComponent,
    RegisterComponent,
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
    MatIconModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
