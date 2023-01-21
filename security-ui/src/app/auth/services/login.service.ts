import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../shared/models/login.model';
import { Router } from '@angular/router';

const CHAVE: string = "usuarioLogado";

const API_URL = 'http://localhost:8080/api/v1/auth/authenticate';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  storage: Storage;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.storage = window.localStorage;
  }

  login(login: Login) {
    return this.http.post(`${API_URL}`, login, {
      observe: "body",
      responseType: "text"
    })
  }

  /* login(login: Login) {
     return this.http.post(`${API_URL}`, login).subscribe(response => {
       var token = JSON.parse(JSON.stringify(response)).token
       this.storage.setItem("token", token)
       this.router.navigate(['/home'])
     },
       error => {
         console.error('Erro ao logar')
       }
     )
   } */

  successfulLogin(arg0: string | null) {
    return null;
  }

}
