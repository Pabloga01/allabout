import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  options = ['Opción 1', 'Opción 2', 'Opción 3'];

  ngOnInit() {
    this.loadCountryOptions();
  }


  loadCountryOptions() {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map((country: { name: any; }) => country.name);
        this.options = countryNames;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };




  submitForm() {
    (async () => {
      const name: any = document.querySelector('.name-input');
      const surname: any = document.querySelector('.surname-input');
      const usertag: any = document.querySelector('.usertag-input');
      const password: any = document.querySelector('.password-input');
      const country: any = document.querySelector('.country-select');
      const mail: any = document.querySelector('.mail-input');


      const dataJson = JSON.stringify({ name: name.value, surname: surname.value, usertag: usertag.value, country: country.textContent, mail: mail.value, password: password.value });
      const query = await fetch('http://localhost:3000/backend/api/registeruser/' + dataJson, { mode: 'cors' })
      const data = await query.json();
      if (data != false) {
        window.location.href = 'http://localhost:4200/login';
      } else {
        console.log('register failed')
      }
    })()


  }
}
