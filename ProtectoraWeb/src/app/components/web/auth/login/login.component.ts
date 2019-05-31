import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    // Redirije al home si el usuario está logeado;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // Carga el formulario una vez el componente se ha creado.
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Accede a los controles del formulario de forma abreviada (this.form.)
  get form() {
    return this.loginForm.controls;
  }

  // Logea en la aplicación
  login() {

    // Impide que se envíen los datos si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.form.email.value, this.form.password.value)
      .subscribe(data => {
        this.closeDialog();
      }, error => {
          this.error = error;
          console.log('error: ', error);
      });

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
