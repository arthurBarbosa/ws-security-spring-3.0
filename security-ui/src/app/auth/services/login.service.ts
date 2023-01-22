import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../shared/models/login.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

const CHAVE: string = "usuarioLogado";

const API_URL = 'http://localhost:8080/api/v1/auth/authenticate';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  storage: Storage;
  @Output() showMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.storage = window.localStorage;
  }

  login(login: Login) {
    return this.http.post(`${API_URL}`, login)
      .pipe(
        tap(res => {
          let token = JSON.parse(JSON.stringify(res)).token
          this.storage.setItem('token', token);
          this.showMenu.emit(true)
        })
      )
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
