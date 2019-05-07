import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal/animal-service';
import { Animal } from 'src/app/models/animal.model';



@Component({
  selector: 'app-registro-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']
})
export class RegisterAnimalComponent implements OnInit {

  registerForm: FormGroup;
  private animal: Animal;

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      adoptionDate: ['', []],
      entranceDate: ['', []],
      status: ['en adopción', []],
      description: ['', [Validators.required]],
      pictures: ['', []]
    });

  }

  dataPrepare() {

    const entranceDate = new Date();
   /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
    let formData = {
      "name": this.registerForm.get('name').value.trim(),
      "type": this.registerForm.get('type').value.trim(),
      "breed": this.registerForm.get('breed').value.trim(),
      "gender": this.registerForm.get('gender').value.trim(),
      "birthDate": this.registerForm.get('birthDate').value,
      "entranceDate": entranceDate,
      "adoptionDate": entranceDate,
      "status": this.registerForm.get('status').value,
      "description": this.registerForm.get('description').value.trim(),
      "pictures":  this.registerForm.get('pictures').value,
    };

    return formData;

  }

  registerSubmit() {
    console.log('Entra en registerSubmit()');

    this.animal = new Animal(this.dataPrepare());
    console.log(this.animal);

    let animalJSON = JSON.stringify(this.animal);
    console.log('Conversión JSON: ', animalJSON);

    this.animalService.registerAnimal(animalJSON).subscribe(data => {
        // this.datosResultado = this.datosCliente.getClientes();
        //this.formCliente.reset();
        //this.toastr.success('Cliente dado de alta');
        console.log('respuesta registerAnimal(data): ', data);
    }, error => {
        console.warn('Error: ', error);
    });
  }
}
