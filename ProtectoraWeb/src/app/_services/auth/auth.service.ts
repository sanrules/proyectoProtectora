import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtResponse } from 'src/app/_models/jwtResponse';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost/ProtectoraWebApi/public/src';

  private currentUserSubject: BehaviorSubject<any>;
  // Controla que cambia el estado de conexión del usuario
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseURL}/login.php`, {email, password})
      .pipe(map(jwtResponse => {
        localStorage.setItem('currentUser', JSON.stringify(jwtResponse));
        this.currentUserSubject.next(jwtResponse);
        return jwtResponse;
      }));
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
