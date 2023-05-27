import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mailError!: string | undefined;
  passwordError!: string | undefined;
  formError!: string | undefined;

  signIn() {

    const mail: any = document.querySelector('.input-mail');
    const password: any = document.querySelector('.input-password');
    const canValidate = this.checkValidations(mail, password);
    if (!canValidate) return;

    (async () => {
      const dataJson = JSON.stringify({ mail: mail.value, password: password.value });
      const urlFetch = 'http://localhost:3000/backend/api/checklogin/' + dataJson;
      const query = await fetch(urlFetch, {
        mode: 'cors'
      })
      const data = await query.json();
      if (data != false) {
        this.formError = undefined;
        sessionStorage.setItem("loginIn", data._id_user);
        window.location.href = 'http://localhost:4200/publicationlist';
      } else {
        this.formError = 'Account does not exist. Please sign in.'
      }
    })()
  }

  checkValidations(mail: any, password: any) {
    let canSubmit = true;
    this.formError = undefined;

    if (mail.value === '') {
      this.mailError = 'Please fill the email address field'
      canSubmit = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail.value)) {
        this.mailError = 'Please enter a valid email direction'
        canSubmit = false;
      } else this.mailError = undefined;
    }
    if (password.value === '') {
      this.passwordError = 'Please fill the password field'
      canSubmit = false;
    } else {
      if (password.value.length < 4) {
        this.passwordError = 'Please enter a valid password. Minimum 4 digits required';
        canSubmit = false;
      } else this.passwordError = undefined;
    }
    return canSubmit;
  }

}
