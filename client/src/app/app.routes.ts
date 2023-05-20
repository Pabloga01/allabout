import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { PublicationComponent } from "./components/publication/publication.component";
import { PublicationsUserListComponent } from "./components/publications-user-list/publications-user-list.component";
const app_routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'publication', component: PublicationComponent },
{ path: 'publicationlist', component: PublicationsUserListComponent }];

export const app_routing = RouterModule.forRoot(app_routes);