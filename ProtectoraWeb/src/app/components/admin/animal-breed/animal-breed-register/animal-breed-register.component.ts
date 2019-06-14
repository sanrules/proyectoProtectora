import { OnInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnimalTypeService } from 'src/app/_services/animals/tipo-animal/animal-type-service';
import { AnimalBreedService } from 'src/app/_services/animals/animal-breed/animal-breed';
import { Breed } from 'src/app/_models/breed.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { Router } from '@angular/router';



@Component({
    selector: 'app-admin-animal-breed-register',
    templateUrl: './animal-breed-register.component.html',
    styleUrls: ['./animal-breed-register.component.css']
  })

  export class AnimalBreedRegisterComponent implements OnInit {

    @Input() public formType: string;
    @Input() public breedData: Breed;

    confirmMessage: string;
    registerForm: FormGroup;
    public breed: Breed;
    public types: any [];
    constructor(private formBuilder: FormBuilder,
                private animalBreedService: AnimalBreedService,
                private animalTypeService: AnimalTypeService,
                private dialog: MatDialog,
                private router: Router) {}

    ngOnInit() {

    this.animalTypeService.getAnimalTypes().subscribe(e => {
      this.types = e.response;
    });

    this.registerForm = this.formBuilder.group({
      idBreed: ['', []],
      idType: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
    if (this.formType == 'breedUpdate') {
     this.setDatosUpdate(this.breedData);
    }
  }

  public setDatosUpdate(data) {

    this.registerForm.get('idType').setValue(data.idType);
    this.registerForm.get('idBreed').setValue(data.id);
    this.registerForm.get('name').setValue(data.name);
}

dataPrepare() {

  const entranceDate = new Date();
 /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
  const formData = {
    "id": this.registerForm.get('idBreed').value,
    "idType": this.registerForm.get('idType').value,
    "name": this.registerForm.get('name').value.trim(),

  };

  return formData;

}

  registerSubmit() {
    console.log('Entra en registerSubmit()');
    if (this.formType == 'breedUpdate'){
      this.breed = this.dataPrepare();

      const animalJSON = JSON.stringify(this.breed);
      console.log('Conversión JSON: ', animalJSON);
      this.animalBreedService.updateAnimalBreed(animalJSON).subscribe(data => {
          console.log('respuesta registerAnimal(data): ', data);
          this.openDialog(data, 1);
          this.router.navigateByUrl('admin/animals-breed/management');
      }, error => {
          console.warn('Error: ', error);
          this.openDialog(error, 2);
      });
    } else {
      this.breed = this.dataPrepare();
      delete this.breed.id;
      const animalJSON = JSON.stringify(this.breed);
      console.log('Conversión JSON: ', animalJSON);

      this.animalBreedService.registerAnimalBreed(animalJSON).subscribe(data => {
          console.log('respuesta registerAnimal(data): ', data);
          this.openDialog(data, 1);
          this.router.navigateByUrl('admin/animals-breed/management');
      }, error => {
          console.warn('Error: ', error);
          this.openDialog(error, 2);
      });
    }
  }

  openDialog(aux, type) {
    if (this.formType === 'breedUpdate') {
      if ((aux !== undefined && type === 1) || (aux === undefined && type === 2)) {
        this.confirmMessage =
        'La actualización se ha completado correctamente.';
      } else {
        this.confirmMessage =
        'Se ha producido un error en la actualizacion';
      }
    } else {
      if ((aux !== undefined && type === 1) || (aux === undefined && type === 2)) {
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
