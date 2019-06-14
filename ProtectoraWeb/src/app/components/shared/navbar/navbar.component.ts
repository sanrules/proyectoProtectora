import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../_services/user/user-service';
import { User } from 'src/app/_models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged: boolean;
  loggedUser: User;
  loggedUserName: string;
  loggedAvatar: string;
  userId: number;
  name: string;
  currentUser: Observable<any>;
  closeResult: string;

  // Login
  loginForm: FormGroup;
  invalidLogin: boolean;
  error: string;



  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {

    this.logged = this.authService.isLogged();
    this.userId = this.authService.userIdLogged();

    if (this.logged) {
      this.userService.getuserById(this.userId).subscribe(user => {
        this.loggedUser = user.response;
        this.loggedAvatar = user.response.avatar;
        this.loggedUserName = user.response.username;
        this.name = user.response.name + ' ' + user.response.surname;
      });
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  enterProfile(id: number) {
    this.router.navigate(['/user/profile', id]);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  isLogOut() {
    return this.authService.isLogged();
  }

  connectAdmin() {
    return this.authService.isAdmin();
  }

  userLogged() {
    return this.authService.userIdLogged();
  }

  // Accede a los controles del formulario de forma abreviada (this.form.)
  get form() {
    return this.loginForm.controls;
  }

  // Logea en la aplicación
  login() {

    // Impide que se envíen los datos si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.form.email.value, this.form.password.value)
      .subscribe(data => {
        this.userId = this.authService.userIdLogged();
        this.ngOnInit();
        this.modalService.dismissAll()
        this.router.navigate(['']);
      }, error => {
          this.invalidLogin = true;
          console.log('error: ', error);
      });

  }

}


