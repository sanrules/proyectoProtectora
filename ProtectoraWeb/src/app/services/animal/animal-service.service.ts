import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {

  baseURL = 'http://localhost/';

  constructor(private http: HttpClient) { }


// Solicita a la API una lista con todos los animales.
getAnimal() {
  console.log('Respuesta backEnd => insert_animal()');
  console.log(
    this.http.get('https://github.com/typicode/demo/blob/master/db.json')
  );
  return this.http.get(
    'https://github.com/typicode/demo/blob/master/db.json'
  );
}

// Solicita a la API el animal que se le manda por parámetro
getanimalById() {}

// Da de alta un nuevo animal
registerAnimal(data) {
  console.log('Respuesta backEnd => insert_animal()');
  console.log(
    this.http.get(
      `${
        this.baseURL
      }/ProtectoraWebApi/controller/animal_controller.php/insert_animal`
    )
  );
  return this.http.get(
    `${
      this.baseURL
    }/ProtectoraWebApi/controller/user_controller.php/create_user`
  );
}

// Modifica un animal
updateUser() {}
}