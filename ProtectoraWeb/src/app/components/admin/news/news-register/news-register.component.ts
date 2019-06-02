import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../../../_models/type.model';
import { News } from 'src/app/_models/news.model';



@Component({
    selector: 'app-news-register',
    templateUrl: './news-register.component.html',
    styleUrls: ['./news-register.component.css']
  })

  export class NewsRegisterComponent implements OnInit {

    @Input() public typeForm: string;
    @Input() public NewsData: News;

    registerForm: FormGroup;
    public news: News;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {


    this.registerForm = this.formBuilder.group({
      idnews: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      publicationDate: ['', []],
    });

    if (this.typeForm === 'newsUpdate') {
      console.log('animal: ', this.NewsData);
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
    this.registerForm.get('publicationDate').setValue(this.parseDate(data.publicationDate));
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
    console.log('Entra en registerSubmit()');

    this.news = this.dataPrepare();
    console.log(this.news);
    delete this.news.id;
    let animalJSON = JSON.stringify(this.news);
    console.log('Conversión JSON: ', animalJSON);

    /* this.animalTypeService.registerAnimalType(animalJSON).subscribe(data => {
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    }); */
  }

  guardar() {

    console.log('formulario: ', this.dataPrepare());

  }
  borrar() {

    console.log('borrar: ');
  }


}
