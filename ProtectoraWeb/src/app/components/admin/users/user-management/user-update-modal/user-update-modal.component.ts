// Core
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css']
})
export class UserUpdateModalComponent implements OnInit {

  public tipo = 'userUpdate';
  public userData: User;

  constructor( public dialogRef: MatDialogRef<UserUpdateModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    this.userData = this.data;
    console.log('userData1: ', this.userData);
  }

}
