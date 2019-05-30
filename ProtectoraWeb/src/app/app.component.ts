import { Component } from '@angular/core';
import { JwtResponse } from './_models/jwtResponse';
import { AuthService } from './_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProtectoraWeb';
  currentUser: JwtResponse;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

}
