import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Breed } from 'src/app/_models/breed.model';
import { AnimalTypeService } from 'src/app/_services/animals/tipo-animal/animal-type-service';


@Component({
    selector: 'app-animal-breed-update',
    templateUrl: './animal-breed-update.component.html',
    styleUrls: ['./animal-breed-update.component.css']
  })
  export class AnimalBreedUpdateComponent implements OnInit {

    public formType = 'breedUpdate';
    public breedData: Breed;

    constructor(
      public dialogRef: MatDialogRef<AnimalBreedUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Breed) {}

    ngOnInit() {
      this.breedData = this.data;
    }

}
