import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Type } from 'src/app/_models/type.model';
import { News } from 'src/app/_models/news.model';




@Component({
    selector: 'app-formulario-animal-type-modal',
    templateUrl: './news-modal.component.html',
  })
  export class NewsUpdateModal implements OnInit {

    public typeForm = 'newsUpdate';
    public newData: News;

    constructor(
      public dialogRef: MatDialogRef<NewsUpdateModal>,
      @Inject(MAT_DIALOG_DATA) public data: News) {}

    ngOnInit() {
      this.newData = this.data;

    }

}
