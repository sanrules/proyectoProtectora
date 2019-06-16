import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getNews(): Observable<any> {
    return this.http.get(`${this.baseURL}/newGetAll.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getNewById(id) {
    return this.http.post(`${this.baseURL}/newGetById.php`, id, this.httpOptions);
  }

  // Da de alta un nuevo usuario
  registerNew(data): Observable<any> {
    return this.http.post(`${this.baseURL}/newInsert.php`, data, this.httpOptions);
  }

  // Modifica un usuario
  updateNew(data): Observable<any> {
    return this.http.post(`${this.baseURL}/newUpdate.php`, data, this.httpOptions);
  }
  deleteNew(id): Observable<any> {
    return this.http.post(`${this.baseURL}/newDelete.php`, id, this.httpOptions);
  }

}
