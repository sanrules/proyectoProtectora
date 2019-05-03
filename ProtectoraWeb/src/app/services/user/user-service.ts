import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost:80/';

  constructor(private http: HttpClient) { }


  // Solicita a la API una lista con todos los usuarios.
  getUser() {
    console.log(this.http.get('https://github.com/typicode/demo/blob/master/db.json'));
    return this.http.get('https://github.com/typicode/demo/blob/master/db.json');
  }


  // Solicita a la API el usuario que se le manda por parámetro
  getuserById() {

  }


  // Da de alta un nuevo usuario
  registerUser() {
    console.log(this.http.get(`${this.baseURL}/ProtectoraWebApi/controller/user_controller.php/insert_user`));
    return this.http.get(`${this.baseURL}/ProtectoraWebApi/controller/user_controller.php/create_user`);
  }


  // Modifica un usuario
  updateUser() {

  }

}
