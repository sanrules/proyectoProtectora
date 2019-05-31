
import { Component, OnInit ,  Inject, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnimalService } from 'src/app/_services/animal/animal-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Animal } from 'src/app/_models/animal.model';
import { AwsUploadService } from 'src/app/_services/awsFiles/awsUpload-service';

@Component({
  selector: 'app-admin-animal-register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})

export class AnimalRegisterComponent implements OnInit {

  @Input() public tipo: string;
  @Input() public animalData: Animal;

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
              private animalService: AnimalService
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
    "pictures":  this.registerForm.get('pictures').value,
  };

  return formData;

}

  registerSubmit() {
    console.log('Entra en registerSubmit()');

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