import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  // TODO: poner las variables de animal en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApi/controller';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los animales.
  getAnimals(): Observable<any> {
    return this.http.get(`${this.baseURL}/animal/get_all_animals.php`);
  }

  // Solicita a la API el animal que se le manda por parámetro
  getAnimalById() {}

  // Da de alta un nuevo animal
  registerAnimal(data): Observable<any> {
    //return this.http.get(`${this.baseURL}/user/insert_user.php?createuser=${data}`);
    return this.http.post(`${this.baseURL}/animal/insert_animal.php`, data, this.httpOptions);
  }

  // Modifica un animal
  updateAnimal() {}

}