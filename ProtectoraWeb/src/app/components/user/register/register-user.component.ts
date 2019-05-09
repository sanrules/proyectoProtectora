import { Component, OnInit } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user-service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  // Variables del componente
  registerForm: FormGroup;
  private user: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  // Carga los datos una vez haya cargado lo del constructor
  ngOnInit() {
    // Crea el formulario y le agrega a un formGroup, para poder tener las validaciones y los métodos de los formularios reactivos de Angular
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      portal: ['', []],
      floor: ['', []],
      door: ['', []],
      userType: ['user', []]
    });

    /* this.userService.getUsers().subscribe(data => {
      this.user = new User(data);
      console.log('Recojo valores del backend: ', this.user);
      },
      error => {
        console.log('Error: ', error);
      }
    ); */

  }

  registerSubmit() {
    console.log('Entra en registerSubmit()');

    // Se guardan los datos del formulario en un objeto usuario
    this.user = new User(this.registerForm.value);
    console.log('this.user: ', this.user);

    // Se convierte el objeto user a JSON para enviarlo a la API
    const userJSON = JSON.stringify(this.user);
    console.log('Conversión JSON: ', userJSON);

    this.userService.registerUser(userJSON).subscribe(data => {
      console.log('repuesta registerUser(data): ', data);
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }
}
