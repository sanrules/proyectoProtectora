import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminUserRegisterComponent } from 'src/app/components/admin/users/user-register/admin-user-register.component';

@Component({
  selector: 'app-register-confirmation-animal',
  templateUrl: './register-confirmation-animal.component.html',
  styleUrls: ['./register-confirmation-animal.component.css']
})
export class RegisterConfirmationAnimalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminUserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

}
