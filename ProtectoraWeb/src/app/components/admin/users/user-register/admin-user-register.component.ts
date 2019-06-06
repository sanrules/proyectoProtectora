import { Component, OnInit, Input } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Servicios
import { UserService } from 'src/app/_services/user/user-service';
// Interfaces
import { User } from 'src/app/_models/user.model';
// Components

// Material
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';


@Component({
  selector: 'app-admin-user-registro',
  templateUrl: './admin-user-register.component.html',
  styleUrls: ['./admin-user-register.component.css']
})
export class AdminUserRegisterComponent {

  // Variables del componente
  registerForm: FormGroup;
  confirmMessage: string;
  regError: boolean;

  user: User;

  tiposUsuario: any[] = [
    {value: 'admin', desc: 'Administrador'},
    {value: 'voluntario', desc: 'Voluntario'},
    {value: 'user', desc: 'Usuario'}
  ];

  fileUpload: any;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  step = 0;

  // Depende de la página que accede al formulario podrá ser:
  // userUpdate, userAdmin o userRegister
  @Input() public formType: string;
  @Input() public userData: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog,
              private storage: AngularFireStorage) {}

  ngOnInit() {
    // Crea el formulario y le agrega a un formGroup:
    // Así se tienen las validaciones y los métodos de los formularios reactivos de Angular
    this.registerForm = this.formBuilder.group({
      idUser: ['', []],
      userName: ['Usuario', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)]],
      password: ['QWas12', [Validators.required,
                      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
                     ]],
      email: ['usuario@correo.es', [Validators.required, Validators.email]],
      name: ['Nombre', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-zñáéíúóñç]+[ -]?){1,2}$/)]],
      surname: ['Apellidos', [Validators.required, Validators.pattern(/([A-ZÁÉÍÓÚÑ]{1}[a-záéíúóñç]+[ -]?){1,2}$/)]],
      dni: ['12345678A', []],
      phone: ['987654321', [Validators.required, Validators.pattern(/^[6789]{1}[0-9]{8}$/)]],
      birthDate: ['', [ Validators.required]],
      street: ['Calle', [Validators.required]],
      number: ['1', [Validators.required]],
      portal: ['2', []],
      floor: ['3', []],
      door: ['4', []],
      province: ['Madrid', []],
      city: ['Rivas', []],
      postalCode: ['28521', []],
      userType: ['user', [Validators.required]],
      imgUrl: ['', []]
    });

    if (this.formType === 'userUpdate' || this.formType === 'userProfileUpdate') {
      this.setUpdateData(this.userData);
      console.log('userData', this.userData);
    }
  }

  openInput(event) {
    document.getElementById('imgUpload').click();
  }

  selectImage(event) {
    const file = event.target.files[0];
    this.fileUpload = file;
  }

  onUpload(file, id) {
    const extension = file.name.slice(-4);
    const filePath = `/profileavatars/${id}/avatar${extension}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    /* ref.getDownloadURL().subscribe((URL) => {
      this.urlImage = URL;
      this.formArray.get([3]).get('imgUrl').setValue(URL);
    }); */
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
          this.urlImage = url;
          this.registerForm.get('imgUrl').setValue(url);
          this.sendAvatarToBBDD(id);
        });
      })
    ).subscribe();
  }

  sendAvatarToBBDD(id: number) {
    console.log('entra en sendAvatar');
    this.userService.setAvatar(id, this.registerForm.get('imgUrl').value).subscribe(resp => {
      console.log('respAvatar: ', resp);
      this.openDialog();
    }, error => {
        console.log('Error: ', error);
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

  public parseFormDate(date) {
    const arrayHourAndDate = date.split(' ');
    const arrayDate = arrayHourAndDate[0].split('-');
    date = new Date(arrayDate[0], (arrayDate[1] - 1 ), arrayDate[2]);
    return date;
  }

  setUpdateData(userUpdate) {
    this.registerForm.get('idUser').setValue(parseInt(userUpdate.id));
    this.registerForm.get('userName').setValue(userUpdate.username);
    this.registerForm.get('password').setValue(userUpdate.password);
    this.registerForm.get('email').setValue(userUpdate.email);
    this.registerForm.get('name').setValue(userUpdate.name);
    this.registerForm.get('surname').setValue(userUpdate.surname);
    this.registerForm.get('dni').setValue(userUpdate.dni);
    this.registerForm.get('phone').setValue(parseInt(userUpdate.phone));
    this.registerForm.get('birthDate').setValue(this.parseFormDate(userUpdate.birth_date));
    this.registerForm.get('street').setValue(userUpdate.street);
    this.registerForm.get('number').setValue(parseInt(userUpdate.number));
    this.registerForm.get('portal').setValue(userUpdate.portal);
    this.registerForm.get('floor').setValue(parseInt(userUpdate.floor));
    this.registerForm.get('door').setValue(userUpdate.door);
    this.registerForm.get('province').setValue(userUpdate.province);
    this.registerForm.get('city').setValue(userUpdate.city);
    this.registerForm.get('postalCode').setValue(parseInt(userUpdate.postal_code));
    this.registerForm.get('userType').setValue(userUpdate.user_type);
    this.registerForm.get('imgUrl').setValue(userUpdate.avatar);
  }

  // Prepara los datos del formulario para enviarlos en el formato correcto a la API
  dataPrepare() {
    const formData = {
      "id": this.registerForm.get('idUser').value,
      "username": this.registerForm.get('userName').value.trim(),
      "password": this.registerForm.get('password').value.trim(),
      "email": this.registerForm.get('email').value.trim(),
      "name": this.registerForm.get('name').value.trim(),
      "surname": this.registerForm.get('surname').value.trim(),
      "dni": this.registerForm.get('dni').value.trim(),
      "phone": this.registerForm.get('phone').value,
      "birth_date": this.dateToTimestamp(this.registerForm.get('birthDate').value),
      "street": this.registerForm.get('street').value.trim(),
      "number": this.registerForm.get('number').value,
      "portal": this.registerForm.get('portal').value.trim(),
      "floor":  this.registerForm.get('floor').value,
      "door":  this.registerForm.get('door').value.trim(),
      "province": this.registerForm.get('province').value.trim(),
      "city": this.registerForm.get('city').value.trim(),
      "postal_code": this.registerForm.get('postalCode').value,
      "user_type":  this.registerForm.get('userType').value.trim(),
      "avatar":  '',
    };

    return formData;
  }

  registerSubmit() {
    if (this.formType === 'userUpdate' || this.formType === 'userProfileUpdate') {
      this.user = this.dataPrepare();
      const userJSON = JSON.stringify(this.user);
      console.log('datos a enviar: ', userJSON);
      this.userService.updateUser(userJSON).subscribe(data => {
          console.log('repuesta registerUser(data): ', data);
          this.onUpload(this.fileUpload, data.response);
        },
        error => {
          console.log('Error: ', error);
        });
    } else {
        // Se guardan los datos del formulario en un objeto usuario
        this.user = this.dataPrepare();
        // Se borra el campo de idUser para que no se envíe al back y se autogenere.
        delete this.user.id;
        // Se convierte el objeto user a JSON para enviarlo a la API
        const userJSON = JSON.stringify(this.user);
        console.log('Send JSON: ', userJSON);
        // Se envían los datos mediante post a la API
        this.userService.registerUser(userJSON).subscribe(data => {
          console.log('repuesta registerUser(data): ', data);
          this.onUpload(this.fileUpload, data.response);
          this.regError = false;
          },
          error => {
            this.regError = true;
            console.log('Error: ', error);
          }
        );
      }
  }

  openDialog() {
    if (this.regError) {
      this.confirmMessage = 'Ha habido un error';
    } else {
      if (this.formType === 'userUpdate') {
        this.confirmMessage = 'Usuario actualizado correctamente';
      } else {
          this.confirmMessage = 'Usuario registrado correctamente';
      }
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    // Enviar un mensaje con el estado para poner una imagen si ha ido bien o mal.
    dialogConfig.data = this.confirmMessage;
    dialogConfig.autoFocus = false;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
