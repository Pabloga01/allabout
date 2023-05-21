import { Component } from '@angular/core';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent {
  item = { content: 'pub1', description: 'a description', date: 'a', id: 'id' }
  publications = [this.item, this.item, this.item, this.item, this.item]

  ngOnInit() {
    if (sessionStorage.getItem('loginIn') == null) {
      window.location.href = 'http://localhost:4200/login';
    }
    this.loadUserPublications();
  }

  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selectedOption: string | undefined;
  imagen = "";


  loadUserPublications() {
    const userId = sessionStorage.getItem('loginIn');
    console.log(userId);
    fetch('http://localhost:3000/backend/api/publicationsbyuser/' + userId)
      .then(response => response.json())
      .then(data => {
        this.publications = [];
        console.log(data);
        data.forEach((element: any) => {
          this.publications.push({ content: element.content, description: element.description, date: element.date.substring(0, 10), id: element.id_publication });
          this.options = data;
        })
      })
  }



  async deletePublication() {
    const input: any = event?.target;
    const id = input.parentNode.parentNode.parentNode.id;
    //delete publication
    (async () => {
      const response = await fetch('http://localhost:3000/backend/api/publicationdelete/' + id);
      const data = await response.json();
      console.log(data);
      if (data) location.reload();

    })()
  }

  logout() {
    window.location.href = 'http://localhost:4200/login';
    sessionStorage.removeItem('loginIn');
    sessionStorage.clear();

  }

}

