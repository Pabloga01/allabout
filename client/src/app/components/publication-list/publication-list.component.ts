import { Component } from '@angular/core';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent {
  item = { title: 'pub1', description: 'a description' }
  publications = [this.item, this.item, this.item, this.item, this.item]

  ngOnInit() {
    this.loadUserPublications();
  }

  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selectedOption: string | undefined;
  imagen = "";


  loadUserPublications() {






    fetch('http://localhost:3000/backend/api/publicationsbyuser/' + 1)
      .then(response => response.json())
      .then(data => {
        this.publications = [];
        console.log(data);
        data.forEach((element: any) => {
          this.publications.push({ title: element.content, description: element.description });
          this.options = data;
        })
      })

  }
}
