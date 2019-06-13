import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public formType = 'userProfileUpdate';
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    console.log('userDataProfileUpdate: ', this.user);
  }

}
