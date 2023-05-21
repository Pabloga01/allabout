import { Component } from '@angular/core';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  template: `<app-nav></app-nav>`,
})

export class PublicationComponent {
  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selectedOption: string | undefined;
  imagen = "";



  submitForm() { }
}
