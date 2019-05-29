import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Type } from 'src/app/_models/type.model';




@Component({
    selector: 'app-formulario-animal-type-modal',
    templateUrl: './news-modal.component.html',
  })
  export class NewsUpdateModal implements OnInit {
    
    public tipo = 'typeUpdate';
    public typeData: Type;
    
    constructor(
      public dialogRef: MatDialogRef<NewsUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: Type) {}

    ngOnInit() {
      this.typeData = this.data;

    }

}
