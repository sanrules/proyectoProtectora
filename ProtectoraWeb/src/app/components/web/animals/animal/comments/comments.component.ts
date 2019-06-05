import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// Services
import { UserService } from '../../../../../_services/user/user-service';
import { CommentService } from 'src/app/_services/animals/comments/comment.service';
import { AuthService } from '../../../../../_services/auth/auth.service';
// Models
import { User } from '../../../../../_models/user.model';
import { Comment } from '../../../../../_models/comment.model';
// Components
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
// Material
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentForm: FormGroup;
  user: User;
  comment: Comment;
  comments: Comment[] = [];
  jwt: any;
  idUser: number;
  confirmMessage: string;

  @Input() animalId: number;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getCommentsByAnimal(this.animalId).subscribe(commentGet => {
      this.comments = commentGet;
    });

    this.authService.currentUser.subscribe(userGet => {
      this.jwt = this.authService.decodeJWT(userGet.jwt);
      console.log('jwt: ', this.jwt);
      this.idUser = this.jwt.data.id;

      this.userService.getuserById(this.idUser).subscribe(user => {
        this.user = user.response;
        console.log('user: ', this.user);
      });
    });


    this.commentForm = this.formBuilder.group({
      id: ['', []],
      animalId: ['', []],
      userId: ['', []],
      date: ['', []],
      text: ['', [Validators.required]]
    });

    console.log('form: ', this.commentForm);
  }

  dateToTimestamp(date) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);

    return date;
  }

  dataPrepare() {

    const date = new Date();
   /*  const imagenes = this.registerForm.get('pictures').value.split(','); */
    const formData: Comment = {
      "id": this.commentForm.get('id').value,
      "animalId": this.commentForm.get('animalId').value,
      "userId": this.commentForm.get('userId').value,
      "date": this.dateToTimestamp(date),
      "text": this.commentForm.get('text').value.trim(),
    };

    return formData;
  }

  commentSubmit() {
    this.comment = this.dataPrepare();

    // Se borra el campo de idUser para que no se envíe al back y se autogenere.
    delete this.comment.id;

    // Se convierte el objeto user a JSON para enviarlo a la API
    const commentJSON = JSON.stringify(this.comment);
    console.log('Conversión JSON: ', commentJSON);

    // Se envían los datos mediante post a la API
    this.commentService.postComment(commentJSON).subscribe(data => {
      console.log('repuesta postComment(data): ', data);
    },
    error => {
      console.log('Error: ', error);
    });

  }

  openDialog() {
    this.confirmMessage =
      'Comentario enviado con éxito';

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.confirmMessage;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
