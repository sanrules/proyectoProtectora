import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']
})
export class RegisterAnimalComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
  }
  dataParse() {}

  registerSubmit() {
    console.log(this.registerForm.value);
  }

}
