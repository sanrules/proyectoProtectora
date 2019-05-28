import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginComponent } from '../../web/auth/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../_services/auth/auth.service';
import { JwtResponse } from '../../../_models/jwtResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean;
  currentUser: JwtResponse;

  constructor(private dialog: MatDialog,
              private authService: AuthService) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
    if (this.currentUser) {
      this.isAdmin = this.authService.isAdmin();
    }

    console.log('currentUser: ', this.currentUser);
  }

  ngOnInit() {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'customDialog';
    dialogConfig.autoFocus = false;

    this.dialog.open(LoginComponent, dialogConfig);
  }


}


