import { Component, OnInit } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
// Servicios
import { UserService } from 'src/app/_services/user/user-service';
// Interfaces
import { User } from 'src/app/_models/user.model';
// Components
import { RegisterConfirmationComponent } from 'src/app/components/web/auth/register/register-confirmation/register-confirmation.component';
// Material
import { MatDialogConfig, MatDialog } from '@angular/material';
// FireStorage
import { AngularFireStorage } from '@angular/fire/storage';
// Rxjs
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent  implements OnInit {

  // Variables del componente
  registerForm: FormGroup;
  isLinear = true;
  confirmMessage: string;
  user: User;

  fileUpload: any;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.registerForm.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog,
              private storage: AngularFireStorage) {}

  ngOnInit() {
    // Crea el formulario y le agrega a un formGroup:
    // Así se tienen las validaciones y los métodos de los formularios reactivos de Angular
    this.registerForm = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          idUser: ['', []],
          userType: ['user', []],
          userName: ['Usuario', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)]],
          password: ['ASDqw12', [Validators.required,
                          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
                    ]],
          email: ['correo@usuario.es', [Validators.required, Validators.email]],
        }),
        this.formBuilder.group({
          name: ['Nombre', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-zñáéíúóñç]+[ -]?){1,2}$/)]],
          surname: ['Apellidos', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-záéíúóñç]+[ -]?){1,2}$/)]],
          dni: ['12345678S', []],
          phone: [987654321, [Validators.required, Validators.pattern(/^[6789]{1}[0-9]{8}$/)]],
          birthDate: ['26/13/2016', [ Validators.required]],
        }),
        this.formBuilder.group({
          street: ['Calle', [Validators.required]],
          number: ['1', [Validators.required]],
          portal: ['2', []],
          floor: ['3', []],
          door: ['4', []],
          province: ['Madrid', []],
          city: ['Rivas Vaciamadrid', []],
          postalCode: ['28521', []]
        }),
        this.formBuilder.group({
          imgUrl: ['', []]
        })
      ])
    });
  }

  openInput(event) {
    document.getElementById('imgUpload').click();
  }

  selectImage(event) {
    const file = event.target.files[0];
    this.fileUpload = file;
  }

  onUpload(file, folder) {
    const filePath = `/profileavatars/${folder}/avatar.png`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    ref.getDownloadURL().subscribe((URL) => {
      this.urlImage = URL;
      this.formArray.get([3]).get('imgUrl').setValue(URL);
    });
  }

  dateToTimestamp(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);

    return date;
  }

  // Prepara los datos del formulario para enviarlos en el formato correcto a la API
  dataPrepare() {
    const formData = {
      "idUser": this.formArray.get([0]).get('idUser').value,
      "userType":  this.formArray.get([0]).get('userType').value.trim(),
      "userName": this.formArray.get([0]).get('userName').value.trim(),
      "password": this.formArray.get([0]).get('password').value.trim(),
      "email": this.formArray.get([0]).get('email').value.trim(),
      "name": this.formArray.get([1]).get('name').value.trim(),
      "surname": this.formArray.get([1]).get('surname').value.trim(),
      "dni": this.formArray.get([1]).get('dni').value.trim(),
      "phone": this.formArray.get([1]).get('phone').value,
      "birthDate": this.dateToTimestamp(this.formArray.get([1]).get('birthDate').value),
      "street": this.formArray.get([2]).get('street').value.trim(),
      "number": this.formArray.get([2]).get('number').value,
      "portal": this.formArray.get([2]).get('portal').value.trim(),
      "floor":  this.formArray.get([2]).get('floor').value,
      "door":  this.formArray.get([2]).get('door').value.trim(),
      "province":  this.formArray.get([2]).get('province').value.trim(),
      "city":  this.formArray.get([2]).get('city').value.trim(),
      "postalCode":  this.formArray.get([2]).get('postalCode').value.trim(),
      "avatar": ''
    };

    return formData;
  }

  registerSubmit() {
    // Se guardan los datos del formulario en un objeto usuario
    this.user = this.dataPrepare();

    // Se borra el campo de idUser para que no se envíe al back y se autogenere.
    delete this.user.idUser;

    // Se convierte el objeto user a JSON para enviarlo a la API
    const userJSON = JSON.stringify(this.user);
    console.log('Conversión JSON: ', userJSON);

    // Se envían los datos mediante post a la API
    this.userService.registerUser(userJSON).subscribe(data => {
      console.log('repuesta registerUser(data): ', data);
      console.log('avatar: ', this.formArray.get([3]).get('imgUrl').value);
      console.log('fileRegister: ', this.fileUpload);

      this.onUpload(this.fileUpload, data.response);
      this.userService.setAvatar(data.response, this.formArray.get([3]).get('imgUrl').value).subscribe(() => {
        console.log('subida avatar OK');
      }, error => {
          console.log('Error: ', error);
      });

      this.openDialog();
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }

  openDialog() {
    this.confirmMessage =
      'Su registro se ha completado correctamente, en breves momentos recibirá un correo electrónico para completarlo.';

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.confirmMessage;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
