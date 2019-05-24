import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnimalBreedService } from 'src/app/services/raza-animal/animal-raza-service';
import { Breed } from '../../../../models/breed.model';


@Component({
    selector: 'app-admin/animal-breed/register',
    templateUrl: './animal-breed-register.component.html',
    styleUrls: ['./animal-breed-register.component.css']
  })

  export class AnimalBreedRegisterComponent implements OnInit {
    registerForm: FormGroup;
    public breed: Breed;
    constructor(private formBuilder: FormBuilder,
                private animalBreedService: AnimalBreedService){}

    ngOnInit() {


    this.registerForm = this.formBuilder.group({
      idType: ['', []],
      idBreed: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
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
    "id": this.registerForm.get('idType').value,
    "idtipo": this.registerForm.get('idBreed').value,
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


}
