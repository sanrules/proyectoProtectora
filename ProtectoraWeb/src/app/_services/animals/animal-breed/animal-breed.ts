import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnimalBreedService {

  // TODO: poner las variables de animal en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todas las razas de animal.
  getAnimalBreeds(): Observable<any> {
    console.log('Respuesta backEnd => get_animalBreeds_all()');
    return this.http.get(`${this.baseURL}/animalBreedGetAll.php`);
  }

  // Solicita a la API la raza que se le manda por parámetro
  getAnimalBreedsByIdType(id): Observable<any> {
    return this.http.post(`${this.baseURL}/animalBreedGetByIdType.php`, id, this.httpOptions);
  }

  // Da de alta una  nueva raza
  registerAnimalBreed(data): Observable<any> {
    return this.http.post(`${this.baseURL}/animalBreedInsert.php`, data, this.httpOptions);
  }

  // Solicita a la API la raza con el id que se le envía por parámetro
  getAnimalBreedById(id) {
    return this.http.post(`${this.baseURL}/animalBreedGetById.php`, id, this.httpOptions);
  }

  // Modifica una raza
  updateAnimalBreed(data): Observable<any> {
    return this.http.post(`${this.baseURL}/animalBreedUpdate.php`, data, this.httpOptions);
  }
}
