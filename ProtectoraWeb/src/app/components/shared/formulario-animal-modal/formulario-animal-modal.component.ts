import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Animal } from '../../../models/animal.model';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
    selector: 'app-fiormulario-animal-modal',
    templateUrl: './fromulario-animal-modal.component.html',
  })
  export class FormularioAnimalModal implements OnInit {
    registerForm: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<FormularioAnimalModal>,
      @Inject(MAT_DIALOG_DATA) public data: Animal,
      private formBuilder: FormBuilder) {}

    ngOnInit() {

      console.log("data:", this.data);

        this.registerForm = this.formBuilder.group({
            name: [this.data.name, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            type: [this.data.type, [Validators.required]],
            breed: [this.data.breed, [Validators.required]],
            gender: [this.data.gender , [Validators.required]],
            birthDate: [this.data.birthDate, [Validators.required]],
            adoptionDate: [this.data.adoptionDate, []],
            entranceDate: [this.data.entranceDate, []],
            status: [this.data.adoptionDate, []],
            description: [this.data.description, [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]],
            pictures: [this.data.pictures, []]
          });
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
