import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from '../../../../_models/type.model';
import { AnimalTypeService } from '../../../../_services/animals/tipo-animal/animal-type-service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin-animal-type-register',
    templateUrl: './animal-type-register.component.html',
    styleUrls: ['./animal-type-register.component.css']
  })

  export class AnimalTypeRegisterComponent implements OnInit {

    @Input() public formType: string;
    @Input() public typeData: Type;

    confirmMessage: string;
    registerForm: FormGroup;
    public type: Type;
    constructor(private formBuilder: FormBuilder,
                private animalTypeService: AnimalTypeService,
                private dialog: MatDialog,
                private router: Router) {}

    ngOnInit() {


    this.registerForm = this.formBuilder.group({
      idType: ['', []],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });

    if (this.formType == 'typeUpdate') {
      this.setDatosUpdate(this.typeData);
    }
  }



  public setDatosUpdate(data) {

    this.registerForm.get('idType').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
}

dataPrepare() {

  const entranceDate = new Date();
 
  let formData = {
    "id": this.registerForm.get('idType').value,
    "name": this.registerForm.get('name').value.trim(),

  };

  return formData;

}

  registerSubmit() {
    if (this.formType == 'typeUpdate'){
      this.type = this.dataPrepare();
      const animalJSON = JSON.stringify(this.type);
      this.animalTypeService.updateAnimalType(animalJSON).subscribe(data => {
          this.router.navigateByUrl('admin/animals-type/management');
          this.openDialog(data, 1);
      }, error => {
          console.warn('Error: ', error);
          this.openDialog(error, 2);
      });
    } else {

      this.type = this.dataPrepare();
      delete this.type.id;
      const animalJSON = JSON.stringify(this.type);
      this.animalTypeService.registerAnimalType(animalJSON).subscribe(data => {
          this.router.navigateByUrl('admin/animals-type/management');
          this.openDialog(data, 1);
      }, error => {
          console.warn('Error: ', error);
          this.openDialog(error, 2);
      });

    } 
  }
  openDialog(aux, type) {
    if (this.formType === 'typeUpdate') {
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
          'El registro de tipo de animal se ha completado correctamente.';
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
