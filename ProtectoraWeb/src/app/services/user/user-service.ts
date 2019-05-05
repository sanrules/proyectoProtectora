import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApiPruebas/controller';

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getUsers() {
    console.log('Respuesta backEnd => get_user_all()');
    return this.http.get(`${this.baseURL}/user/get_all_users.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getuserById() {}

  // Da de alta un nuevo usuario
  registerUser(data) {
    //return this.http.get(`${this.baseURL}/user/insert_user.php?createuser=${data}`);
    return this.http.post(`${this.baseURL}/user/insert_user.php`, data);
  }

  // Modifica un usuario
  updateUser() {}

}
