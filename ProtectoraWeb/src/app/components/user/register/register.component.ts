import { Component, OnInit } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user-service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variables del componente
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private user: UserService) { }

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
      birthDate: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      floor: ['', []],
      door: ['', []],
      userType: ['', []]
    });
    console.log(this.registerForm.value);
/*     this.user.registerUser('{userName: "User", email: "user@user.com", password: "1234", name: "Nombre", surname: "Apellido"}'); */
    this.user.registerUser('{"username": "User", "email": "user@user.com", "password": "1234", "name": "Nombre", "surname": "Apellido","phone": "987654231", birth_date: "10/10/2019 00:00", "address": "Direccion", "user_type": "usuario"}').subscribe((resp: any[]) => {
      console.log(resp);
    });
  }

  dataParse() {

  }

  registerSubmit() {
    console.log('entra en la función');
    console.log(this.registerForm.value);
    //this.user.registerUser();
    /* this.user.registerUser().subscribe((resp: any[]) => {
      console.log(resp);
    }); */
    this.user.registerUser("datos enviados desde angular");
  }

}
