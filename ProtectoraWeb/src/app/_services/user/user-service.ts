import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApi/public/src';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/getAllUsers.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getuserById() {}

  // Da de alta un nuevo usuario
  registerUser(data): Observable<any> {
    // return this.http.post(`${this.baseURL}/user/insert_user.php`, data, this.httpOptions);
    return this.http.post(`${this.baseURL}/insertUser.php`, data, this.httpOptions);
  }

  // Modifica un usuario
  updateUser(data): Observable<any> {
    return this.http.post(`${this.baseURL}/updateUser.php`, data, this.httpOptions);
  }
}
