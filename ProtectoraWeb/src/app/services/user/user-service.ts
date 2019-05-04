import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost';

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getUser() {
    console.log('Respuesta backEnd => insert_user()');
    console.log(
      this.http.get('https://github.com/typicode/demo/blob/master/db.json')
    );
    return this.http.get(
      'https://github.com/typicode/demo/blob/master/db.json'
    );
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getuserById() {}

  // Da de alta un nuevo usuario
  registerUser(data) {
    console.log('Respuesta backEnd => insert_user()');
    console.log(
      this.http.get(`${this.baseURL}/ProtectoraWebApi/controller/index.php`)
    );
    this.http.get(`${this.baseURL}/ProtectoraWebApi/controller/index.php`);
    // return this.http.post(
    //   `${this.baseURL}/ProtectoraWebApi/controller/index.php`,
    //   data
    // );

    // Envía los datos por GET y se recogen con $_REQUEST['dates']
    return this.http.get(
      `${this.baseURL}/ProtectoraWebApi/controller/index.php?data=${data}`
    );
  }

  // Modifica un usuario
  updateUser() {}
}
