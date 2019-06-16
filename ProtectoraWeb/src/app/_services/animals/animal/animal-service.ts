import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  // TODO: poner las variables de animal en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getAnimals(): Observable<any> {
    return this.http.get(`${this.baseURL}/animalGetAll.php`);
  }

  // Solicita a la API el animal que se le manda por parámetro
  getAnimalById(id) {
    return this.http.post(`${this.baseURL}/animalGetById.php`, id, this.httpOptions);
  }

  // Obtiene una lista de animales según su tipo
  getAnimalByType(type) {
    return this.http.post(`${this.baseURL}/animalGetByType.php`, type, this.httpOptions);
  }

  // Obtiene una lista de animales según su estado de adopción
  getAnimalByStatus(status) {
    return this.http.post(`${this.baseURL}/animalGetByStatus.php`, status, this.httpOptions);
  }

  // Obtiene una lista de animales adoptados por un usuario en concreto
  getAnimalByUser(userId) {
    return this.http.post(`${this.baseURL}/animalGetByUser.php`, userId, this.httpOptions);
  }

  // Da de alta un nuevo animal
  registerAnimal(data): Observable<any> {
    return this.http.post(`${this.baseURL}/animalInsert.php`, data, this.httpOptions);
  }

  // Modifica un animal
  updateAnimal(data): Observable<any> {
    return this.http.post(`${this.baseURL}/animalUpdate.php`, data, this.httpOptions);
  }

  // Modifica un animal
  uploadImages(id: number, images: any[]): Observable<any> {
    return this.http.post(`${this.baseURL}/animalUploadImages.php`, {id, images}, this.httpOptions);
  }

}
