import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalBreedService {

  // TODO: poner las variables de animal en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApi/public/src';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getAnimalBreeds(): Observable<any> {
    console.log('Respuesta backEnd => get_animalBreeds_all()');
    return this.http.get(`${this.baseURL}/getAllAnimalBreeds.php`);
  }

  // Solicita a la API el animal que se le manda por parámetro
  getAnimalBreedById(id) {
    return this.http.post(`${this.baseURL}/getAnimalBreedById.php`, id, this.httpOptions);
  }

  // Da de alta un nuevo animal
  registerAnimalBreed(data): Observable<any> {
    //return this.http.get(`${this.baseURL}/user/insert_user.php?createuser=${data}`);
    return this.http.post(`${this.baseURL}/insertAnimalBreed.php`, data, this.httpOptions);
  }

  // Modifica un animal
  updateAnimalBreed() {}

}