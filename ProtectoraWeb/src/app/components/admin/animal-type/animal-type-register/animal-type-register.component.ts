import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../../../models/type.model';
import { AnimalTypeService } from '../../../../services/tipo-animal/animal-type-service';


@Component({
    selector: 'app-admin/animal-type/register',
    templateUrl: './animal-type-register.component.html',
    styleUrls: ['./animal-type-register.component.css']
  })

  export class AnimalTypeRegisterComponent implements OnInit {
    registerForm: FormGroup;
    public type: Type;
    constructor(private formBuilder: FormBuilder,
                private animalTypeService: AnimalTypeService){}

    ngOnInit() {


    this.registerForm = this.formBuilder.group({
      idType: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
  }



  public setDatosUpdate(data) {

    this.registerForm.get('idType').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);  
}

dataPrepare() {

  const entranceDate = new Date();
 /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
  let formData = {
    "id": this.registerForm.get('idType').value,
    "name": this.registerForm.get('name').value.trim(),

  };

  return formData;

}

  registerSubmit() {
    console.log('Entra en registerSubmit()');

    this.type = this.dataPrepare();
    console.log(this.type);
    delete this.type.id;
    let animalJSON = JSON.stringify(this.type);
    console.log('Conversión JSON: ', animalJSON);

    this.animalTypeService.registerAnimalType(animalJSON).subscribe(data => {
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    });
  }


}
