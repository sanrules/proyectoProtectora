import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Animal } from 'src/app/_models/animal.model';


@Component({
    selector: 'app-formulario-animal-modal',
    templateUrl: './animal-update.component.html',
    styleUrls: ['./animal-update.component.css']
  })
  export class AnimalUpdateComponent implements OnInit {

    public formType = 'animalUpdate';
    public animalData: Animal;
    constructor(public dialogRef: MatDialogRef<AnimalUpdateComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Animal ) {}

    ngOnInit() {

      this.animalData = this.data;
      console.log('animal Data', this.animalData);
    }

}
