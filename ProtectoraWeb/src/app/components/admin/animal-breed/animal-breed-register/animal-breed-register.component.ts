import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Type } from '../../../../_models/type.model';
import { AnimalBreedService } from 'src/app/_services/raza-animal/animal-raza-service';
import { AnimalTypeService } from 'src/app/_services/tipo-animal/animal-type-service';
import { Breed } from 'src/app/_models/breed.model';



@Component({
    selector: 'app-admin-animal-breed-register',
    templateUrl: './animal-breed-register.component.html',
    styleUrls: ['./animal-breed-register.component.css']
  })

  export class AnimalBreedRegisterComponent implements OnInit {

    @Input() public tipo: string;
    @Input() public breedData: Breed;

    registerForm: FormGroup;
    public breed: Breed;
    public types: any [];
    constructor(private formBuilder: FormBuilder,
                private animalBreedService: AnimalBreedService,
                private animalTypeService: AnimalTypeService) {}

    ngOnInit() {

    this.animalTypeService.getAnimalTypes().subscribe(e => {
      this.types = e.response;
      console.log(e);
      });

    this.registerForm = this.formBuilder.group({
      idBreed: ['', []],
      idType: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
    if (this.tipo == 'breedUpdate'){
      console.log("breed: ", this.breedData);
     this.setDatosUpdate(this.breedData);
    }
  }

  public setDatosUpdate(data) {

    this.registerForm.get('idType').setValue(data.id);
    this.registerForm.get('idBreed').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
}

dataPrepare() {

  const entranceDate = new Date();
 /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
  let formData = {
    "id": this.registerForm.get('idBreed').value,
    "idtipo": this.registerForm.get('idType').value,
    "nombre": this.registerForm.get('name').value.trim(),

  };

  return formData;

}

  registerSubmit() {
    console.log('Entra en registerSubmit()');

    this.breed = this.dataPrepare();
    console.log(this.breed);
    delete this.breed.id;
    let animalJSON = JSON.stringify(this.breed);
    console.log('Conversión JSON: ', animalJSON);

    this.animalBreedService.registerAnimalBreed(animalJSON).subscribe(data => {
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    });
  }

  guardar(){

    console.log("formulario: ", this.dataPrepare());

  }
  borrar(){

    console.log("borrar: ");
  }



}
