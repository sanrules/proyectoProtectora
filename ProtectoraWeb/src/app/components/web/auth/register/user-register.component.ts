import { Component, ViewChild } from '@angular/core';
import { UserFormComponent } from 'src/app/components/shared/forms/user/user-form.component';

@Component({
  selector: 'app-registro',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent  {

  @ViewChild('registerForm') registerForm: UserFormComponent;

}
