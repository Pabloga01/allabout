import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { PublicationComponent } from "./components/publication/publication.component";
import { PublicationListComponent } from "./components/publication-list/publication-list.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";


const app_routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'publication', component: PublicationComponent },
{ path: 'publicationlist', component: PublicationListComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', component: HomeComponent }

];

export const app_routing = RouterModule.forRoot(app_routes);