import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Type } from 'src/app/_models/type.model';




@Component({
    selector: 'app-animal-type-update',
    templateUrl: './animal-type-update.component.html',
    styleUrls: ['./animal-type-update.component.css']
  })
  export class AnimalTypeUpdateComponent implements OnInit {

    public formType = 'typeUpdate';
    public typeData: Type;

    constructor(
      public dialogRef: MatDialogRef<AnimalTypeUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Type) {}

    ngOnInit() {
      this.typeData = this.data;

    }

}
