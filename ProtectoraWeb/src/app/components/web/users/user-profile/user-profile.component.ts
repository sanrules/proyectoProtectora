import { Component, OnInit } from '@angular/core';
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
      this.userService.getuserById(param.id).subscribe(userGet => {
        this.user = userGet['response'];
        this.userData = this.user;
      });
    });

  }

  loadPage(pageParam: string) {
    this.page = pageParam;
  }

}
