import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: ['./administrator-navbar.component.css']
})
export class AdministratorNavbarComponent implements OnInit {

  formType = 'adminRegister';

  constructor() { }

  ngOnInit() {
  }

}
