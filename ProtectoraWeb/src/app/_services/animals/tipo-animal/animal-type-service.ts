import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnimalTypeService {

  baseURL = environment.baseURL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getAnimalTypes(): Observable<any> {
    return this.http.get(`${this.baseURL}/animalTypeGetAll.php`);
  }

  // Solicita a la API el animal que se le manda por parámetro
  getAnimalTypeById(id) {
    return this.http.post(`${this.baseURL}/animalTypeGetById.php`, id, this.httpOptions);
  }

  // Da de alta un nuevo animal
  registerAnimalType(data): Observable<any> {
    //return this.http.get(`${this.baseURL}/user/insert_user.php?createuser=${data}`);
    return this.http.post(`${this.baseURL}/animalTypeInsert.php`, data, this.httpOptions);
  }

  // Modifica un animal
  updateAnimalType(data): Observable<any> {
    return this.http.post(`${this.baseURL}/animalTypeUpdate.php`, data, this.httpOptions);
  }

}