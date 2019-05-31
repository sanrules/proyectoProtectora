import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const currentUser = this.authService.currentUserValue;
     if (currentUser) {
      // Si el usuario está logeado se autoriza.
      return true;
     }
     // redirige a la pantalla de login si no está logeado
     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
     return false;
   }

}