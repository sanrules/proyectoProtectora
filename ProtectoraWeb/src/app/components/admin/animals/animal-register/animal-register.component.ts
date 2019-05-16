import { Component, ViewChild } from '@angular/core';
import { AnimalFormComponent } from '../../../shared/forms/animal/animal-form.component';


@Component({
  selector: 'app-admin/animal/register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})
export class AnimalRegisterComponent {

@ViewChild(AnimalFormComponent) hijo: AnimalFormComponent;
}
