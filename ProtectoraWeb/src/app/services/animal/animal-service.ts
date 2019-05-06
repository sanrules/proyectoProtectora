import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApi/controller';

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getAnimals() {
    console.log('Respuesta backEnd => get_animal_all()');
    return this.http.get(`${this.baseURL}/user/get_all_animals.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getAnimalById() {}

  // Da de alta un nuevo usuario
  registerAnimal(data) {
    //return this.http.get(`${this.baseURL}/user/insert_user.php?createuser=${data}`);
    return this.http.post(`${this.baseURL}/animal/insert_animal.php`, data);
  }

  // Modifica un usuario
  updateAnimal() {}

}