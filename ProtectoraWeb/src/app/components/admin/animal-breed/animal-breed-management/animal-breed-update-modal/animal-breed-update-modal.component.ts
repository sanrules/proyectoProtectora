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

    public tipo = 'breedUpdate';
    public breedData: Breed;

    constructor(
      public dialogRef: MatDialogRef<FormularioAnimalBreedUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: Breed) {}

    ngOnInit() {
      this.breedData = this.data;
    }
 
}
