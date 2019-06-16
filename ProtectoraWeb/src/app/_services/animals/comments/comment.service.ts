import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseURL = environment.baseURL;
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
