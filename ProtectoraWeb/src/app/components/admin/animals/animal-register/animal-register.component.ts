
import { Component, OnInit , Input , ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  @Input() public tipo: string;
  @Input() public animalData: Animal;

  bucketName = 'animalimg';

  uploadpercent: Observable<number>;
  urlImage: string;
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
      birthDate: ['', [Validators.required]],
      adoptionDate: ['', []],
      entranceDate: ['', []],
      status: ['en adopción', []],
      description: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]],
      pictures: ['', []]
    });

    if (this.tipo == 'animalUpdate'){
      console.log("animal: ", this.animalData);
     this.setDatosUpdate(this.animalData);
    }
  }

  onUpload(e) {
    console.log("imagen", e);

    const imgId = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `animales/img_${imgId}`;
    const ref = this.firestorage.ref(filePath);
    const task = this.firestorage.upload(filePath, file);

    this.uploadpercent = task.percentageChanges();

    ref.getDownloadURL().subscribe((URL) => {
      this.urlImage = URL;
    });
  }



  public spararFechaYHora(fecha) {
    let arrayFechaYHora = fecha.split(" ");
    let arrayfecha = arrayFechaYHora[0].split("-");
    fecha = new Date(arrayfecha[0],(arrayfecha[1]-1),arrayfecha[2]);
    return fecha;
  }

  public setDatosUpdate(data) {

    this.registerForm.get('idAnimal').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
    this.registerForm.get('type').setValue(data.type);
    this.registerForm.get('breed').setValue(data.breed);
    this.registerForm.get('gender').setValue(data.gender);
    this.registerForm.get('birthDate').setValue(this.spararFechaYHora(data.birth_date));
    this.registerForm.get('adoptionDate').setValue(data.adoption_date);
    this.registerForm.get('entranceDate').setValue(this.spararFechaYHora(data.entrance_date));
    this.registerForm.get('status').setValue(data.status);
    this.registerForm.get('description').setValue(data.description);
    this.registerForm.get('pictures').setValue(data.pictures);

}

dateToTimestamp(date) {

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  date = Date.UTC(year, month, day, 0, 0, 0);
  console.log('date: ', date);

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
    "birthDate": this.dateToTimestamp(this.registerForm.get('birthDate').value),
    "entranceDate": this.dateToTimestamp(entranceDate),
    "adoptionDate": this.dateToTimestamp(entranceDate) ,
    "status": this.registerForm.get('status').value,
    "description": this.registerForm.get('description').value.trim(),
    "pictures": this.urlImage,
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
        // this.datosResultado = this.datosCliente.getClientes();
        //this.formCliente.reset();
        //this.toastr.success('Cliente dado de alta');
        this.limpiarForm();
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    });
  }

  public limpiarForm() {
    this.registerForm.markAsUntouched();
    this.registerForm.reset();
   /*  this.formBuilder.resetForm(); */
  }




  /* ngAfterViewInit() { 

    let instance = this; 
    this.uploader = new s3.FineUploaderBasic({
      button: document.getElementById('upload_image'),
      debug: false,
      autoUpload: true,
      multiple: true,
      validation: {
        allowedExtensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
        sizeLimit: 5120000 // 50 kB = 50 * 1024 bytes
      },
      region: 'UE(París)',
      request: {
        endpoint: 'https://' + instance.bucketName  + '.s3.amazonaws.com/',
        accessKey: 'AKIAIC2ZN6GDUX2PP5OQ',
        params: { 'Cache-Control': 'private, max-age=31536000, must-revalidate' }
      },
      signature: {
        endpoint: 'http://localhost:8000/api/v1/fine_uploader/s3_signature/',
      },
      iframeSupport: {
        localBlankPagePath: '/somepage.html'
      },
      cors: {
        expected: true,
        sendCredentials: true
      },
      objectProperties: {
        acl: 'public-read',       
      },     
      callbacks: {
        onSubmit: function (id, fileName) {
          console.log('selected file:', fileName);
        },
        // onSubmitted: function(id, name) { alert('onSubmitted');},
        onComplete: function (id, name, responseJSON, maybeXhr) {
          if(responseJSON.success) {
            console.log('upload complete', name);
            console.log('uploaded image url', 'https://' + instance.bucketName + '.s3.amazonaws.com/' + this.getKey(id));
          }
        },
        // onAllComplete: function (successful, failed) { console.log(failed); },
        // onCancel: function (id, name) {},
        // onUpload: function(id, name) { alert('onUpload');},
        // onUploadChunk: function(id, name, chunkData) { alert('onUploadChunk');},
        // onUploadChunkSuccess: function(id, chunkData, responseJSON, xhr) { alert('onUploadChunkSuccess');},
        // onResume: function(id, fileName, chunkData) { alert('onResume');},
        // onProgress: function (id, name, loaded, total) {},
        // onTotalProgress: function(loaded, total) { alert('onTotalProgress');},
        // onError: function (id, name, reason, maybeXhrOrXdr) {  },      
        // onSessionRequestComplete: function (response, success, xhrOrXdr) { }
      }
    });
  } */
/* 
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadFile(file);
    }
    
    selectFile(event) {
    this.selectedFiles = event.target.files;
    }
 */
}