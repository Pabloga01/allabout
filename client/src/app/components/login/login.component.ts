import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  signIn() {
    (async () => {
      const mail: any = document.querySelector('.input-mail');
      const password: any = document.querySelector('.input-password');

      const dataJson = JSON.stringify({ mail: mail.value, password: password.value });
      const urlFetch = 'http://localhost:3000/backend/api/checklogin/' + dataJson;
      const query = await fetch(urlFetch, {
        mode: 'cors'
      })
      const data = await query.json();
      if (data != false) {
        sessionStorage.setItem("loginIn", data._id_user);
        window.location.href = 'http://localhost:4200/publicationlist';
      }

    })()



  }

}
