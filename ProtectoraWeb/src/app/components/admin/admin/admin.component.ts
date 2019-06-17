import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user-service';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public user: User;
  public checkUser: any;
  public name: string;
  public page: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.userService.getuserById(this.authService.userIdLogged()).subscribe(userGet => {
      this.user = userGet['response'];
      this.name = this.user.name + ' ' + this.user.surname;

      this.authService.currentUser.subscribe(userProfile => {
        this.checkUser = this.authService.decodeJWT(userProfile.jwt);

        if (this.checkUser.data.id !== this.user.id) {
          this.router.navigate(['/']);
        }

      });

    });
  }

  loadPage(pageParam: string) {
    this.page = pageParam;
  }

}
