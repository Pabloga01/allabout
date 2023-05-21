import { Component } from '@angular/core';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent {
  item = { title: 'pub1', description: 'a description' }
  publications = [this.item, this.item, this.item,this.item,this.item]



  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selectedOption: string | undefined;
  imagen = "";

}
