import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../web/auth/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../_services/auth/auth.service';
import { JwtResponse } from '../../../_models/jwtResponse';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../../../_services/user/user-service';
import { User } from 'src/app/_models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  logged: boolean;
  loggedUser: User;
  userId: number;
  currentUser: Observable<any>;


  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    // this.authService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit() {

    this.logged = this.authService.isLogged();

    this.userId = this.authService.userIdLogged();

    if (this.logged) {
      this.userService.getuserById(this.userId).subscribe(user => {
        this.loggedUser = user.response;
      });
    }

/*     this.currentUser = this.authService.currentUserValue;

    if (this.currentUser) {
      this.authService.currentUser.subscribe(userProfile => {
        this.user = this.authService.decodeJWT(userProfile.jwt);
        this.userId = this.user.data.id;

        this.userService.getuserById(this.userId).subscribe(user => {
          this.loggedUser = user.response;
          console.log('user: ', user);
        });
      });
    } */

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


