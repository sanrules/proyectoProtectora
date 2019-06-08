import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../web/auth/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../_services/auth/auth.service';
import { JwtResponse } from '../../../_models/jwtResponse';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  userId: number;
  currentUser: Observable<any>;


  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) {
    // this.authService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit() {

    this.currentUser = this.authService.currentUserValue;

    if (this.currentUser) {
      this.authService.currentUser.subscribe(userProfile => {
        this.user = this.authService.decodeJWT(userProfile.jwt);
        this.userId = this.user.data.id;
      });
    }

  }

  enterProfile(id: number) {
    this.router.navigate(['/user/profile', id]);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  isLogOut() {
    return this.authService.isLogged();
  }

  connectAdmin() {
    return this.authService.isAdmin();
  }

  userLogged() {
    return this.authService.userIdLogged();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'customDialog';
    dialogConfig.autoFocus = false;

    this.dialog.open(LoginComponent, dialogConfig);
  }

}


