// Core
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css']
})
export class AdminUserUpdateComponent implements OnInit {

  public formType = 'userUpdate';
  public userData: User;

  constructor( public dialogRef: MatDialogRef<AdminUserUpdateComponent>,
               @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.userData = this.data;
  }

}
