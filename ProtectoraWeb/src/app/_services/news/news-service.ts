import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../_models/news.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // TODO: poner las variables de usuario en el fichero enviroment.ts (mirar en el trabajo cómo se hace)
  baseURL = 'http://localhost/ProtectoraWebApi/public/src';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista con todos los usuarios.
  getNews(): Observable<any> {
    return this.http.get(`${this.baseURL}/getAllNews.php`);
  }

  // Solicita a la API el usuario que se le manda por parámetro
  getnewsById(id) {
    return this.http.post(`${this.baseURL}/userGetById.php`, id, this.httpOptions);
  }

  // Da de alta un nuevo usuario
  registerNews(data): Observable<any> {
    return this.http.post(`${this.baseURL}/insertNews.php`, data, this.httpOptions);
  }

  // Modifica un usuario
  updateNews(data): Observable<any> {
    return this.http.post(`${this.baseURL}/updateUser.php`, data, this.httpOptions);
  }

}
