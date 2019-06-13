import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  baseURL = 'http://localhost/ProtectoraWebApi/public/src';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista de todos los mensajes del animal que se le pasa por id.
  getImagesByAnimal(animalId): Observable<any> {
    return this.http.post(`${this.baseURL}/imagesGetByAnimal.php`, animalId);
  }

  deleteImage(imageId): Observable<any> {
    return this.http.post(`${this.baseURL}/imageDelete.php`, imageId);
  }

}
