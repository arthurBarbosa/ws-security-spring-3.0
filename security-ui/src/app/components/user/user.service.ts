import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';

const API_URL: string = 'http://localhost:8080/api/v1/auth/register'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(`${API_URL}`, user, {
      observe: "body",
      responseType: "text"
    })
  }
}
