import { Component, OnInit } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user-service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-user-register',
  templateUrl: './admin-user-register.component.html',
  styleUrls: ['./admin-user-register.component.css']
})
export class AdminUserRegisterComponent implements OnInit {

  // Variables del componente
  registerForm: FormGroup;
  private user: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  // Carga los datos una vez haya cargado lo del constructor
  ngOnInit() {
    // Crea el formulario y le agrega a un formGroup, para poder tener las validaciones y los métodos de los formularios reactivos de Angular
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)]],
      password: ['', [Validators.required,
                      Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/)
                     ]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚ]{1}[a-záéíúóç]+[ -]?){1,2}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚ]{1}[a-záéíúóç]+[ -]?){1,2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6789]{1}[0-9]{8}$/)]],
      birthDate: ['', [ Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      portal: ['', []],
      floor: ['', []],
      door: ['', []],
      userType: ['user', []]
    });
  }

  dateToTimestamp(date) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);
    console.log('date: ', date);

    return date;
  }
  // Prepara los datos del formulario para enviarlos en el formato correcto a la API
  dataPrepare() {

    const formData = {
      "idUser": this.registerForm.get('idUSer').value,
      "userName": this.registerForm.get('userName').value.trim(),
      "password": this.registerForm.get('password').value.trim(),
      "email": this.registerForm.get('email').value.trim(),
      "name": this.registerForm.get('name').value.trim(),
      "surname": this.registerForm.get('surname').value.trim(),
      "phone": this.registerForm.get('phone').value,
      "birthDate": this.dateToTimestamp(this.registerForm.get('birthDate').value),
      "street": this.registerForm.get('street').value.trim(),
      "number": this.registerForm.get('number').value,
      "portal": this.registerForm.get('portal').value.trim(),
      "floor":  this.registerForm.get('floor').value,
      "door":  this.registerForm.get('door').value.trim(),
      "userType":  this.registerForm.get('userType').value.trim(),
    };

    return formData;
  }

  registerSubmit() {
    console.log('Entra en registerSubmit()');

    // Se guardan los datos del formulario en un objeto usuario
    // this.user = new User(this.dataPrepare());
    this.user = this.dataPrepare();
    console.log('this.user: ', this.user);

    // Se borra el campo de idUser para que no se envíe al back y se autogenere.
    delete this.user.idUser;

    // Se convierte el objeto user a JSON para enviarlo a la API
    const userJSON = JSON.stringify(this.user);
    console.log('Conversión JSON: ', userJSON);

    // Se envían los datos mediante post a la API
    this.userService.registerUser(userJSON).subscribe(data => {
      console.log('repuesta registerUser(data): ', data);
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }

}
