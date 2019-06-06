import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.baseURL}/userGetAll.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getuserById(id: number): Observable<any> {
    return this.http.post(`${this.baseURL}/userGetById.php`, id);
  }

  // Da de alta un nuevo usuario
  registerUser(data): Observable<any> {
    return this.http.post(`${this.baseURL}/userInsert.php`, data, this.httpOptions);
  }

  // Modifica un usuario
  updateUser(data): Observable<any> {
    return this.http.post(`${this.baseURL}/userUpdate.php`, data, this.httpOptions);
  }

  setAvatar(id: number, avatar: string): Observable<any> {
    return this.http.post(`${this.baseURL}/userUploadAvatar.php`, {id, avatar}, this.httpOptions);
  }
}
