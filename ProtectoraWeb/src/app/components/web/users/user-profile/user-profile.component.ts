import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../_services/user/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthService } from '../../../../_services/auth/auth.service';
import { Animal } from 'src/app/_models/animal.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: User;
  public checkUser: any;
  public token: string;
  public userAnimals: Animal[];
  public page: string;
  public name: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {

    if (!this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.route.params.subscribe(param => {

      this.userService.getuserById(param.id).subscribe(userGet => {
        this.user = userGet['response'];
        this.name = this.user.name + ' ' + this.user.surname;

        this.authService.currentUser.subscribe(userProfile => {
          this.checkUser = this.authService.decodeJWT(userProfile.jwt);

          if (this.checkUser.data.id !== this.user.id) {
            this.router.navigate(['/']);
          }

        });

      });

    });

  }

  loadPage(pageParam: string) {
    this.page = pageParam;
  }

}
