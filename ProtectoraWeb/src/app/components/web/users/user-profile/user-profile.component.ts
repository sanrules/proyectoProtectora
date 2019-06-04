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

  public user: User;
  public userData: User;
  page: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(param => {
      console.log('param: ', param);
      this.userService.getuserById(param.id).subscribe(userGet => {
        console.log('resp: ', userGet);
        this.user = userGet['response'];
        this.userData = this.user;
        console.log('user: ', this.user);
        console.log('userDataProfile: ', this.userData);
      });
    });

  }

  loadPage(pageParam: string) {
    this.page = pageParam;
  }

}
