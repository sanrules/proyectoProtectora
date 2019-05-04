import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalServiceService } from '../../../services/animal/animal-service.service';


@Component({
  selector: 'app-registro-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']
})
export class RegisterAnimalComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private animalService: AnimalServiceService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['Nombre', [Validators.required]],
      type: ['Tipo', [Validators.required]],
      breed: ['Raza', [Validators.required]],
      gender: ['Genero', [Validators.required]],
      birthDate: ['Fecha de Nacimiento', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      entranceDate: ['Fecha de Entrada', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      adoptionDate: ['', []],
      status: ['sin adoptar', []],
      description: ['Descripcion', [Validators.required]],
      pictures: ['', []]

    });
    console.log("primer console log");
    console.log(this.registerForm.value);
    /*     this.user.registerUser('{userName: "User", email: "user@user.com", password: "1234", name: "Nombre", surname: "Apellido"}'); */
    this.animalService
      .registerAnimal(
        '{"name": "Nombre", "type": "Gato", "breed": "Raza1", "genero": "Macho", "birth_date": "12/12/2000 00:00","entrance_date": "14/10/2018 00:00","adoption_date": "10/10/2019 00:00", "status": "sin_adoptar", "description": "Descripcion","pictures":"url_imagen"}'
      )
      .subscribe((resp: any[]) => {
        console.log(resp);
      });

  }

  dataParse() {}

  registerSubmit() {
    console.log("segundo console log");

    console.log(this.registerForm.value);

    this.animalService.registerAnimal('datos enviados desde angular');
  }

}
