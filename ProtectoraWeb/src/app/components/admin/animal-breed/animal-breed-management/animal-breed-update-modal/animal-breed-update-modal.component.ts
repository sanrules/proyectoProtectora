import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Breed } from 'src/app/_models/breed.model';
import { AnimalTypeService } from 'src/app/_services/tipo-animal/animal-type-service';


@Component({
    selector: 'app-formulario-animal-modal',
    templateUrl: './animal-breed-update-modal.component.html',
  })
  export class FormularioAnimalBreedUpdateModal implements OnInit {
    registerForm: FormGroup;
    public types: any[];
    constructor(
      public dialogRef: MatDialogRef<FormularioAnimalBreedUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: Breed,
      private formBuilder: FormBuilder,
      private animalTypeService: AnimalTypeService) {}

    ngOnInit() {

      console.log("data:", this.data);
      this.animalTypeService.getAnimalTypes().subscribe(e => {
            this.types = e;
            console.log(e);
          });

      this.registerForm = this.formBuilder.group({
            idBreed: ['', []],
            idType: ['', [Validators.required]],
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
          });
      this.setDatosUpdate(this.data);
    }


    public setDatosUpdate(data) {

      this.registerForm.get('idBreed').setValue(data.id);
      this.registerForm.get('idType').setValue(data.idtype);
      this.registerForm.get('name').setValue(data.name);


  }

    dataPrepare() {

      /* const entranceDate = new Date(); */
     /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
      let formData = {
        "id": this.registerForm.get('idBreed').value.trim(),
        "idtipo": this.registerForm.get('idType').value.trim(),
        "nombre": this.registerForm.get('name').value.trim(),
      };

      return formData;

    }

    onClose(): void {
      this.dialogRef.close();
    }

    guardar(){

      console.log("formulario: ", this.dataPrepare());

    }
    borrar(){

      console.log("borrar: ");
    }

}
