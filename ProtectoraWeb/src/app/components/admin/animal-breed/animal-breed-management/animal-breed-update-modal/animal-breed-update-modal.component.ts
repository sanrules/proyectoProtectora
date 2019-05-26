import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Breed } from '../../../../../_models/breed.model';


@Component({
    selector: 'app-formulario-animal-modal',
    templateUrl: './animal-breed-update-modal.component.html',
  })
  export class FormularioAnimalBreedUpdateModal implements OnInit {
    registerForm: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<FormularioAnimalBreedUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: Breed,
      private formBuilder: FormBuilder) {}

    ngOnInit() {

      console.log('data:', this.data);

      this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            type: ['', [Validators.required]],
            breed: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            birthDate: ['', [Validators.required]],
            adoptionDate: ['', []],
            entranceDate: ['', []],
            status: ['', []],
            description: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]],
            pictures: ['', []]
          });

      this.setDatosUpdate(this.data);
    }
    public spararFechaYHora(fecha) {
      let arrayFechaYHora = fecha.split(" ");
      let arrayfecha = arrayFechaYHora[0].split("-");
      fecha = new Date(arrayfecha[0],(arrayfecha[1]-1),arrayfecha[2]);
      return fecha;
    }

    public setDatosUpdate(data) {

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

    dataPrepare() {

      /* const entranceDate = new Date(); */
     /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
      let formData = {
        "name": this.registerForm.get('name').value.trim(),
        "type": this.registerForm.get('type').value.trim(),
        "breed": this.registerForm.get('breed').value.trim(),
        "gender": this.registerForm.get('gender').value.trim(),
        "birthDate": this.registerForm.get('birthDate').value,
        "entranceDate": this.registerForm.get('entranceDate').value,
        "adoptionDate": this.registerForm.get('adoptionDate').value,
        "status": this.registerForm.get('status').value,
        "description": this.registerForm.get('description').value.trim(),
        "pictures":  this.registerForm.get('pictures').value,
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
