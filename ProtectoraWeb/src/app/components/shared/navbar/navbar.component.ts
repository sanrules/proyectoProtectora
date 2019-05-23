import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginComponent } from '../../web/auth/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'customDialog';

    this.dialog.open(LoginComponent, dialogConfig);
  }


}


