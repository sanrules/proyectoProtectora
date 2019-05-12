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
    onClose(): void {
      this.dialogRef.close();
    }

    onsubmit(){

      console.log("formulario: ",this.registerForm);

    }

}
