import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost:80//ProtectoraWebApi/controller';

  constructor(private http: HttpClient) { }

  // Solicita a la API una lista con todos los usuarios.
  getUsers() {
    console.log('Respuesta backEnd => get_user_all()');
    return this.http.get(`${this.baseURL}/user_controller.php/get_user_all()`).subscribe((data) => {
      console.log('Recojo valores del backend: ', data);
    }, (error) => {
      console.log('Error: ', error);
    });
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
  updateUser() {

  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}
