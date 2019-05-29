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
  isAdmin: boolean;
  isLogged: boolean;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {

    this.authService.admin.subscribe(data => {
      this.isAdmin = data;
      console.log('Es admin: ', this.isAdmin);
    });

    this.authService.logged.subscribe(log => {
      this.isLogged = log;
      console.log('Is logged: ', this.isLogged);
    });

  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);

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


