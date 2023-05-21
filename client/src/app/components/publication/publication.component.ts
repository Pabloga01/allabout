import { Component } from '@angular/core';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  template: `<app-nav></app-nav>`,
})

export class PublicationComponent {
  countryOptions = ['Opción 1', 'Opción 2', 'Opción 3'];
  options: { name: string, id: string }[] = []
  selectedOption: string | undefined;
  imagen = "";


  ngOnInit() {
    if (sessionStorage.getItem('loginIn') == null) {
      window.location.href = 'http://localhost:4200/login';
    }
    this.loadCountryOptions();
    this.loadCategoryOptions();
  }
  loadCountryOptions() {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map((country: { name: any; }) => country.name);
        this.countryOptions = countryNames;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  loadCategoryOptions() {
    fetch('http://localhost:3000/backend/api/categories')
      .then(response => response.json())
      .then(data => {
        this.options = [];
        console.log(data);
        data.forEach((element: any) => {
          const name = element.cat_name;
          const id = element.id_category;
          this.options.push({ name: name, id: id });
        });
        // this.options = data;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  submitForm() {
    const title: any = document.querySelector('.input-title');
    const content: any = document.querySelector('.input-content');
    const date: any = document.querySelector('.input-date');
    const category: any = document.querySelector('.input-category');
    const country: any = document.querySelector('.input-country');

    const user: any = sessionStorage.getItem('loginIn');

    (async () => {
      const publication = {
        title: title.value,
        content: title.value,
        description: content.value,
        date: date.value,
        latitude: 0,
        longitude: 0,
        id_user: user,
        id_category: category.textContent.substring(0, 1),
        country: country.textContent,
      };
      const values = (JSON.stringify(publication));

      const query = await fetch('http://localhost:3000/backend/api/insertpublication2/' + values, {
        mode: 'cors'
      })
      const data = await query.json();
      if (data !== 'false') window.location.href = 'http://localhost:4200/publicationlist';
    })()

  }



  checkTitle() {
    const title: any = document.querySelector('.input_title');
    const regex = /^[a-zA-Z\s']+$/;
    if (title.value === '') {

    } else if (regex.test(title.value)) { }

  }
  checkDescription() {
    const description: any = document.querySelector('.input-content');
  }
  checkContent() {
    const content: any = document.querySelector('.input-content');
  }
  checkDate() {
    const date: any = document.querySelector('.input-date');
  }
  checkCategory() {
    const category: any = document.querySelector('.input-category');
  }


  logout() {
    sessionStorage.removeItem('loginIn');
    sessionStorage.clear();
  }
}








