
import { Component, OnInit , Input , ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AnimalService } from 'src/app/_services/animal/animal-service';
import { Animal } from 'src/app/_models/animal.model';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseStorageService } from '../../../../_services/firebase-upload/firebase-upload-service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-animal-register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})

export class AnimalRegisterComponent implements OnInit {

  @ViewChild('animalImg') animalImg: ElementRef;
  @Input() public formType: string;
  @Input() public animalData: Animal;

  bucketName = 'animalimg';

  files: any[];
  uploadpercent: Observable<number>;
  urlImage: Observable<string>;
  urlImageAr: any[] = [];
  selectedFiles: FileList;
  registerForm: FormGroup;
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
              private firestorage: FirebaseStorageService
              /* private uploadService: AwsUploadService */) { }

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
      status: ['en adopción', []],
      description: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]],
      // animalImgs: ['', []]
    });

    if (this.formType == 'animalUpdate') {
      console.log('animal: ', this.animalData);
      this.setDatosUpdate(this.animalData);
    }
  }

  /* onUpload(e) {
    console.log("imagen", e);

    const imgId = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `animalspictures/img_${imgId}`;
    const ref = this.firestorage.ref(filePath);
    const task = this.firestorage.upload(filePath, file);

    this.uploadpercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  } */

  openInput(event) {
    document.getElementById('imgUpload').click();
  }

  selectImage(event) {
    const file = event.target.files;
    this.files = file;
  }

  onUpload(images) {
    for (let i = 0; i < images.length; i++) {

      const imgId = Math.random().toString(36).substring(2);
      const filePath = `animalspictures/img_${imgId}`;
      const ref = this.firestorage.ref(filePath);
      const task = this.firestorage.upload(filePath, images[i]);

      this.uploadpercent = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            console.log(url); // <-- do what ever you want with the url..
            this.urlImageAr.push(url);
            console.log('urls', this.urlImageAr);
            if (i === images.length - 1)  {
              this.animal.pictures = this.urlImageAr;
          }
        });
      })).subscribe();
    }
  }
  /* this.formArray.get([3]).get('animalImgs').setValue(URL); */



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
    this.registerForm.get('animalImgs').setValue(data.pictures);

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
    "status": this.registerForm.get('status').value,
    "description": this.registerForm.get('description').value.trim(),
    "pictures": '',
  };

  return formData;

}

  registerSubmit() {

    console.log('Entra en registerSubmit()');
    console.log('imagen url', this.animalImg);

    this.animal = this.dataPrepare();
    console.log(this.animal);
    delete this.animal.idAnimal;
    let animalJSON = JSON.stringify(this.animal);
    console.log('Conversión JSON: ', animalJSON);

    this.animalService.registerAnimal(animalJSON).subscribe(data => {

        this.onUpload(this.files);

        this.limpiarForm();
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    });
  }

  public limpiarForm() {
    /* this.registerForm.markAsUntouched();
    this.registerForm.reset(); */
   /*  this.formBuilder.resetForm(); */
  }
}