import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseURL = 'http://localhost/ProtectoraWebApi/public/src';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Solicita a la API una lista de todos los mensajes del animal que se le pasa por id.
  getCommentsByAnimal(animalId): Observable<any> {
    return this.http.post(`${this.baseURL}/commentsGetByAnimal.php`, animalId);
  }
  // Solicita a la API una lista de todos los mensajes del usuario que se le pasa por id.
  getCommentsByUser(userId): Observable<any> {
    return this.http.post(`${this.baseURL}/commentsGetByAnimal.php`, userId);
  }

  // Envía un comentario
  postComment(data): Observable<any> {
    return this.http.post(`${this.baseURL}/commentsInsert.php`, data, this.httpOptions);
  }

}
