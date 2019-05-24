import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { Type } from '../../../../../models/type.model';


@Component({
    selector: 'app-formulario-animal-type-modal',
    templateUrl: './animal-type-update-modal.component.html',
  })
  export class FormularioAnimalTypeUpdateModal implements OnInit {
    registerForm: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<FormularioAnimalTypeUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: Type,
      private formBuilder: FormBuilder) {}

    ngOnInit() {

      console.log("data:", this.data);

      this.registerForm = this.formBuilder.group({
            idType: ['', []],
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          });

      this.setDatosUpdate(this.data);
    }

    public setDatosUpdate(data) {
      this.registerForm.get('idType').setValue(data.id);
      this.registerForm.get('name').setValue(data.name);

  }

    dataPrepare() {

      /* const entranceDate = new Date(); */
     /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
      let formData = {
        "id": this.registerForm.get('idType').value.trim(),
        "name": this.registerForm.get('name').value.trim(),

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
