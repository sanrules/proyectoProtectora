import { Component, OnInit, Input } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Servicios
import { UserService } from 'src/app/_services/user/user-service';
// Interfaces
import { User } from 'src/app/_models/user.model';
// Components
import { RegisterConfirmationComponent } from 'src/app/components/web/auth/register/register-confirmation/register-confirmation.component';
// Material
import { MatDialogConfig, MatDialog } from '@angular/material';


@Component({
  selector: 'app-admin-user-registro',
  templateUrl: './admin-user-register.component.html',
  styleUrls: ['./admin-user-register.component.css']
})
export class AdminUserRegisterComponent {

  // Variables del componente
  registerForm: FormGroup;
  confirmMessage: string;
  user: User;
  regError: boolean;
  tiposUsuario: any[] = [
    {value: 'admin', desc: 'Administrador'},
    {value: 'voluntario', desc: 'Voluntario'},
    {value: 'user', desc: 'Usuario'}
  ];

  // Depende de la página que accede al formulario podrá ser:
  // userUpdate, userAdmin o userRegister
  @Input() public type: string;
  @Input() public userData: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog) {}

  ngOnInit() {
    // Crea el formulario y le agrega a un formGroup:
    // Así se tienen las validaciones y los métodos de los formularios reactivos de Angular
    this.registerForm = this.formBuilder.group({
      idUser: ['', []],
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)]],
      password: ['', [Validators.required,
                      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
                     ]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-zñáéíúóñç]+[ -]?){1,2}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-záéíúóñç]+[ -]?){1,2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6789]{1}[0-9]{8}$/)]],
      birthDate: ['', [ Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      portal: ['', []],
      floor: ['', []],
      door: ['', []],
      userType: ['user', [Validators.required]]
    });

    if (this.type === 'userUpdate') {
      this.setUpdateData(this.userData);
      console.log('user: ', this.userData);
    }
  }

  dateToTimestamp(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);
    console.log('date: ', date);

    return date;
  }

  public parseFormDate(date) {
    const arrayHourAndDate = date.split(' ');
    const arrayDate = arrayHourAndDate[0].split('-');
    date = new Date(arrayDate[0],(arrayDate[1] - 1 ), arrayDate[2]);
    return date;
  }

  setUpdateData(userUpdate) {
    this.registerForm.get('userName').setValue(userUpdate.username);
    this.registerForm.get('password').setValue(userUpdate.password);
    this.registerForm.get('email').setValue(userUpdate.email);
    this.registerForm.get('name').setValue(userUpdate.name);
    this.registerForm.get('surname').setValue(userUpdate.surname);
    this.registerForm.get('phone').setValue(userUpdate.phone);
    this.registerForm.get('birthDate').setValue(this.parseFormDate(userUpdate.birth_date));
    this.registerForm.get('street').setValue(userUpdate.street);
    this.registerForm.get('number').setValue(userUpdate.number);
    this.registerForm.get('portal').setValue(userUpdate.portal);
    this.registerForm.get('floor').setValue(userUpdate.floor);
    this.registerForm.get('door').setValue(userUpdate.door);
    this.registerForm.get('userType').setValue(userUpdate.user_type);

  }


  // Prepara los datos del formulario para enviarlos en el formato correcto a la API
  dataPrepare() {
    const formData = {
      "idUser": this.registerForm.get('idUser').value,
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
    // Se guardan los datos del formulario en un objeto usuario
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
      this.regError = false;
      this.openDialog();
      },
      error => {
        this.regError = true;
        console.log('Error: ', error);
      }
    );
  }

  openDialog() {

    if (this.regError) {
      this.confirmMessage = 'Ha habido un error en el registro';
    } else {
        this.confirmMessage = 'Usuario registrado correctamente';
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    // Enviar un mensaje con el estado para poner una imagen si ha ido bien o mal.
    dialogConfig.data = this.confirmMessage;
    dialogConfig.autoFocus = false;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
