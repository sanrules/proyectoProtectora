
import { Component, OnInit , Input , ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AnimalService } from 'src/app/_services/animals/animal/animal-service';
import { ImagesService } from 'src/app/_services/animals/images/images.service';
import { Animal } from 'src/app/_models/animal.model';
import { FirebaseStorageService } from '../../../../_services/firebase-upload/firebase-upload-service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';

import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-animal-register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})

export class AnimalRegisterComponent implements OnInit {

  @ViewChild('animalImg') animalImg: ElementRef;
  @Input() public formType: string;
  @Input() public animalData: Animal;

  step = 0;
  bucketName = 'animalimg';
  arrayAux: any[] = [];
  files: any[];
  selectedFiles: FileList;
  uploadpercent: Observable<number>;
  urlImage: Observable<string>;
  urlImageAr: any[] = [];
  images: any[];

  registerForm: FormGroup;
  confirmMessage: string;

  private animal: Animal;

  public generos: any = [{
    id: 'Macho',
    name: 'Macho'},
    {
    id: 'Hembra',
    name: 'Hembra'
  }];

  public es: string;

  get formArray(): AbstractControl | null { return this.registerForm.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
              private animalService: AnimalService,
              private firestorage: FirebaseStorageService,
              private dialog: MatDialog,
              private router: Router,
              private imagesService: ImagesService) { }

  ngOnInit() {


    const generosControl = this.generos.map(c => new FormControl(false, Validators.required));

    this.registerForm = this.formBuilder.group({
      idAnimal: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      type: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      gender: ['' , [Validators.required]],
      size: ['' , [Validators.required]],
      birthDate: ['', [Validators.required]],
      adoptionDate: ['', []],
      entranceDate: ['', []],
      status: [0, []],
      description: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]]

    });

    if (this.formType === 'animalUpdate'){
      this.imagesService.getImagesByAnimal(this.animalData.idAnimal).subscribe(e =>{
        this.images = e.response;
        console.log(this.images);
      });
      console.log('animal: ', this.animalData);
      this.setDatosUpdate(this.animalData);
    }
    console.log('form: ', this.registerForm);
  }

  openInput(event) {
    document.getElementById('imgUpload').click();
  }

  selectImage(event) {
    const file = event.target.files;
    this.files = file;
  }

  onUpload(images, id) {
    this.urlImageAr = [];
    for (let i = 0; i < images.length; i++){
      const imgId = Math.random().toString(36).substring(2);
      const filePath = `animalspictures/${id}/img_${imgId}`;
      const ref = this.firestorage.ref(filePath);
      const task = this.firestorage.upload(filePath, images[i]);
      this.uploadpercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {

            this.urlImageAr.push(url);
            console.log('urls', this.urlImageAr);
            if (i == (images.length - 1))  {
              console.log('entra en el subir imagenes');
              this.subirImagenes(id, this.urlImageAr);
            }
          });
        })).subscribe();
    }
  }

  public subirImagenes(id: number, arrayImages) {
    this.animalService.uploadImages(id, arrayImages ).subscribe(() => {
      this.openDialog(id , 1);
      this.router.navigateByUrl('/admin/animals/management');
    }, error => {
        console.log('Error: ', error);
    });
  }

  public removeImage(imageName) {

    for (let i = 0; i < this.files.length; i++) {
        if ( this.files[i].name === imageName ) {
        } else {
        this.arrayAux.push(this.files[i]);
        }
    }
    this.files = this.arrayAux;
    this.arrayAux = [];

  }

  public spararFechaYHora(fecha) {
    let arrayFechaYHora = fecha.split(' ');
    let arrayfecha = arrayFechaYHora[0].split('-');
    fecha = new Date(arrayfecha[0], (arrayfecha[1] - 1), arrayfecha[2]);
    return fecha;
  }

  public setDatosUpdate(data) {

    this.registerForm.get('idAnimal').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
    this.registerForm.get('type').setValue(data.type);
    this.registerForm.get('breed').setValue(data.breed);
    this.registerForm.get('gender').setValue(data.gender);
    this.registerForm.get('size').setValue(data.size);
    this.registerForm.get('birthDate').setValue(this.spararFechaYHora(data.birth_date));
    this.registerForm.get('adoptionDate').setValue(data.adoption_date);
    this.registerForm.get('entranceDate').setValue(this.spararFechaYHora(data.entrance_date));
    this.registerForm.get('status').setValue(data.status);
    this.registerForm.get('description').setValue(data.description);

}

dateToTimestamp(date) {

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  date = Date.UTC(year, month, day, 0, 0, 0);

  return date;
}

dataPrepare() {

  const entranceDate = new Date();
 /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
  let formData = {
    "idAnimal": this.registerForm.get('idAnimal').value,
    "name": this.registerForm.get('name').value.trim(),
    "type": this.registerForm.get('type').value.trim(),
    "breed": this.registerForm.get('breed').value.trim(),
    "gender": this.registerForm.get('gender').value.trim(),
    "size": this.registerForm.get('size').value.trim(),
    "birthDate": this.dateToTimestamp(this.registerForm.get('birthDate').value),
    "entranceDate": this.dateToTimestamp(entranceDate),
    "adoptionDate": this.dateToTimestamp(entranceDate) ,
    "status": +this.registerForm.get('status').value,
    "description": this.registerForm.get('description').value.trim(),
    "pictures": '',
  };

  return formData;

}

  registerSubmit() {
    if (this.formType === 'animalUpdate') {

      this.animal = this.dataPrepare();
      const userJSON = JSON.stringify(this.animal);
      console.log('datos a enviar: ', userJSON);
      this.animalService.updateAnimal(userJSON).subscribe(data => {

        if ( this.files === undefined ) {
          this.router.navigateByUrl('/admin/animals/management');
          this.openDialog(data, 1);
          } else {
              this.onUpload(this.files, data.response);
          }
        console.log('repuesta registerAnimal(data): ', data.response);
        },
        error => {
          console.log('Error: ', error);
          this.openDialog(error, 2);
        });

    } else {
      this.animal = this.dataPrepare();
      delete this.animal.idAnimal;

      let animalJSON = JSON.stringify(this.animal);
      console.log('Conversión JSON: ', animalJSON);

      this.animalService.registerAnimal(animalJSON).subscribe(data => {

        if ( this.files === undefined ) {
          this.router.navigateByUrl('/admin/animals/management');
          this.openDialog(data, 1);
        } else {
            this.onUpload(this.files, data.response);
        }
        console.log('respuesta registerAnimal(data): ', data);
      }, error => {
          console.warn('Error: ', error);
          this.openDialog(error , 2 );
      });
    }
  }

  openDialog(aux , type) {
    if (this.formType === 'animalUpdate') {
      if ( (aux !== undefined && type === 1) || (aux === undefined && type === 2) ) {
      this.confirmMessage =
      'La actualización se ha completado correctamente.';
    } else {
      this.confirmMessage =
      'Se ha producido un error en la actualizacion';
    }
    } else {
      if ((aux !== undefined && type === 1) || (aux === undefined && type === 2) ) {
    this.confirmMessage =
      'El registro de animal se ha completado correctamente.';
    } else {

    this.confirmMessage =
      'Se ha producido un error en el registro';
      }
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.confirmMessage;

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
