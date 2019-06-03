import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../_services/user/user-service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(userId => {
      console.log('parametros, ', userId);
      this.userService.getuserById(userId).subscribe(user => {
        console.log('user: ', user);
        this.user = user['response'];
        console.log('animal: ', this.user);
      });

    });

  }

}
