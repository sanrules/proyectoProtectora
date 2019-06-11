import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { News } from 'src/app/_models/news.model';




@Component({
    selector: 'app-news-update',
    templateUrl: './news-update.component.html',
    styleUrls: ['./news-update.component.css']
  })
  export class NewsUpdateComponent implements OnInit {

    public formType = 'newsUpdate';
    public newData: News;

    constructor(
      public dialogRef: MatDialogRef<NewsUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: News) {}

    ngOnInit() {
      this.newData = this.data;

    }

}
