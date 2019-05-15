import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnimalService } from 'src/app/services/animal/animal-service';
import { Animal } from 'src/app/models/animal.model';


@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  registerForm: FormGroup;
  private animal: Animal;
  public generos: any = [{
    id: 'Macho',
    name: 'Macho'},
    {
    id: 'Hembra',
    name: 'Hembra'
    }];

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService) { }

  ngOnInit() {

    const generosControl = this.generos.map(c => new FormControl(false, Validators.required));

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      type: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      gender: ['' , [Validators.required]],
      birthDate: ['', [Validators.required]],
      adoptionDate: ['', []],
      entranceDate: ['', []],
      status: ['en adopción', []],
      description: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(300)]],
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
