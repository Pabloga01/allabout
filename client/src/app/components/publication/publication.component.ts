import { Component } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent {
  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selectedOption: string | undefined;
  imagen = "";



  submitForm() { }
}
