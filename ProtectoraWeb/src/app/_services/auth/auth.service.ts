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

  isAdmin() {
    // Se guarda el token almacenado en el sistema
    let token = this.currentUserSubject.value;
    // Se recoje solo la propia cadena en la que está codificado el token
    token = token.jwt;
    // Se decodifica el token y se guarda el tipo de usuario
    let user = this.decodeJWT(token);
    user = user.data.type;

    if (user === 'admin') {
      return true;
    } else {
        return false;
    }
  }

  /*
  * Decodifica un token pasado por parámetro.
  * @params(token:strinng): Cadena codificada del token.
  * @return: Retorna el token codificado para manipularlo como se quiera
  */
  decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
  }


}
