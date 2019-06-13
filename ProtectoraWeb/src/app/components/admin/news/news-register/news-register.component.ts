import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../../../_models/type.model';
import { News } from 'src/app/_models/news.model';
import { NewsService } from '../../../../_services/news/news-service';
import { MatDialogConfig } from '@angular/material';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { MatDialog } from '@angular/material';



@Component({
    selector: 'app-news-register',
    templateUrl: './news-register.component.html',
    styleUrls: ['./news-register.component.css']
  })

  export class NewsRegisterComponent implements OnInit {

    @Input() public formType: string;
    @Input() public NewsData: News;

    confirmMessage: string;
    registerForm: FormGroup;
    public news: News;
    constructor(private formBuilder: FormBuilder,
                private newsService: NewsService,
                private dialog: MatDialog) {}

    ngOnInit() {


    this.registerForm = this.formBuilder.group({
      idnews: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      publicationDate: ['', []],
    });

    if (this.formType === 'newsUpdate') {
      console.log('noticia: ', this.NewsData);
      this.setUpdateData(this.NewsData);
    }
  }

  public parseDate(fecha) {
    let arrayFechaYHora = fecha.split(' ');
    let arrayfecha = arrayFechaYHora[0].split('-');
    fecha = new Date(arrayfecha[0], (arrayfecha[1] - 1), arrayfecha[2]);
    return fecha;
  }

  public setUpdateData(data) {

    this.registerForm.get('idnews').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
    this.registerForm.get('content').setValue(data.content);
    this.registerForm.get('publicationDate').setValue(this.parseDate(data.date));
}

dateToTimestamp(date) {

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  date = Date.UTC(year, month, day, 0, 0, 0);

  return date;
}


dataPrepare() {

  const todayDate = new Date();

  let formData = {
    'id': this.registerForm.get('idnews').value,
    'name': this.registerForm.get('name').value.trim(),
    'content': this.registerForm.get('content').value.trim(),
    'publicationDate': this.dateToTimestamp(todayDate),

  };

  return formData;

}

  registerSubmit() {
    if (this.formType === 'newsUpdate') {
    console.log('Entra en registerSubmit()');
    this.news = this.dataPrepare();
    console.log(this.news);
    let animalJSON = JSON.stringify(this.news);
    console.log('Conversión JSON: ', animalJSON);
    this.newsService.updateNew(animalJSON).subscribe(data => {
        console.log('respuesta updateNew(data): ', data);
        this.openDialog(data, 1);
    }, error => {
        console.warn('Error: ', error);
        this.openDialog(error, 2);
    });

    } else {
    console.log('Entra en registerSubmit()');
    this.news = this.dataPrepare();
    console.log(this.news);
    delete this.news.id;
    let animalJSON = JSON.stringify(this.news);
    console.log('Conversión JSON: ', animalJSON);
    this.newsService.registerNew(animalJSON).subscribe(data => {

        console.log('respuesta registerNew(data): ', data);
        this.openDialog(data, 1);
    }, error => {
        console.warn('Error: ', error);
        this.openDialog(error, 2);
    });
    }

  }

  openDialog(aux, type) {
    if (this.formType === 'newsUpdate') {
      if ( (aux !== undefined && type === 1) || (aux === undefined && type === 2) ) {
      this.confirmMessage =
      'La actualización se ha completado correctamente.';
    } else {
      this.confirmMessage =
      'Se ha producido un error en la actualizacion';
    }
    } else {
      if ((aux !== undefined && type === 1) || (aux === undefined && type === 2) ) {
    this.confirmMessage =
      'El registro de animal se ha completado correctamente.';
    } else {

    this.confirmMessage =
      'Se ha producido un error en el registro';
      }
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.confirmMessage;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
