import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://127.0.0.1:8080/';

  constructor(private http: HttpClient) { }


  // Solicita a la API una lista con todos los usuarios.
  getUser() {
    return this.http.get(`${this.baseURL}/ProtectoraWebApi/controller/user_controller.php/insert_user`);
  }


  // Solicita a la API el usuario que se le manda por parámetro
  getuserById() {

  }


  // Da de alta un nuevo usuario
  registerUser() {

  }


  // Modifica un usuario
  updateUser() {

  }

}
