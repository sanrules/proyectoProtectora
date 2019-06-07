import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../web/auth/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../_services/auth/auth.service';
import { JwtResponse } from '../../../_models/jwtResponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  userId: number;
  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) {
    // this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {

    this.authService.currentUser.subscribe(userProfile => {
      this.user = this.authService.decodeJWT(userProfile.jwt);
      this.userId = this.user.data.id;
      console.log('userId', this.userId );
    });

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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'customDialog';
    dialogConfig.autoFocus = false;

    this.dialog.open(LoginComponent, dialogConfig);
  }


}


