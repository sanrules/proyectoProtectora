import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtResponse } from 'src/app/_models/jwtResponse';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*   @Output() admin = new EventEmitter();
  @Output() logged = new EventEmitter();
  @Output() userLogged = new EventEmitter(); */

  baseURL = 'http://localhost/ProtectoraWebApi/public/src';

  private currentUserSubject: BehaviorSubject<any>;
  // Controla que cambia el estado de conexión del usuario
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
/*     this.logged.emit(this.isLogged());
    this.admin.emit(this.isAdmin()); */
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseURL}/userLogin.php`, {email, password})
      .pipe(map(jwtResponse => {
        const token = this.saveTokenLocalStorage(jwtResponse);
        return token;
      }));
  }

  saveTokenLocalStorage(token) {
    localStorage.setItem('currentUser', JSON.stringify(token));
    this.currentUserSubject.next(token);
/*     this.admin.emit(this.isAdmin());
    this.logged.emit(this.isLogged());
    this.userLogged.emit(this.userIdLogged()); */
    return token;
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.logged.emit(this.isLogged());
  }

  isAdmin() {
    // Se guarda el token almacenado en el sistema
    let token = this.currentUserSubject.value;

    if (token != null) {
      // Se recoje solo la propia cadena en la que está codificado el token
      token = token.jwt;

      // Se decodifica el token y se guarda el tipo de usuario
      let user = this.decodeJWT(token);
      user = user.data.type;

      if (user === 'admin') {
        return true;
      } else {
    }

      return false;
    }
  }

  isLogged() {
    const token = this.currentUserSubject.value;
    let logged = false;

    if (token !== null) {
      logged = true;
    }
    return logged;
  }

  userIdLogged() {
    let token = this.currentUserSubject.value;

    if (token != null) {
      token = token.jwt;

      let user = this.decodeJWT(token);
      user = user.data.id;

      return user;
    }
  }

  /*
  * Decodifica un token pasado por parámetro.
  * @params(token:strinng): Cadena codificada del token.
  * @return: Retorna el token codificado para manipularlo como se quiera
  */
  decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
  }

}
