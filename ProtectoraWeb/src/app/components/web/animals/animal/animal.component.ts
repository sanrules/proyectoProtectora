import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animal } from 'src/app/_models/animal.model';
import { AnimalService } from 'src/app/_services/animals/animal/animal-service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { AuthService } from '../../../../_services/auth/auth.service';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  public animalId: number;
  animal: Animal;
  images: any[];
  adoptError: boolean;
  confirmMessage: string;
  public animalData: Animal;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private imgService: ImagesService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {

      this.animalService.getAnimalById(parametros.id).subscribe(anim => {
        this.animal = anim['response'];
        this.animalData = this.animal;
        this.animalId = this.animal.id;

        this.imgService.getImagesByAnimal(this.animal.id).subscribe(resp => {
          this.images = resp.response;
        });

      });


    });
  }

  public parseDate(date) {
    const arrayDateTime = date.split(' ');
    const dateArray = arrayDateTime[0].split('-');
    date = new Date(dateArray[0], (dateArray[1] - 1), dateArray[2]);
    return date;
  }

  dateToTimestamp(date) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    date = Date.UTC(year, month, day, 0, 0, 0);

    return date;
  }

  prepareAdoptData() {

    this.animal.birth_date = this.parseDate(this.animal.birth_date);
    this.animal.entrance_date = this.parseDate(this.animal.entrance_date);

    const adoptData = {
      'id': this.animal.id,
      'name': this.animal.name.trim(),
      'type': this.animal.type,
      'breed': this.animal.breed,
      'gender': this.animal.gender.trim(),
      'size': this.animal.size.trim(),
      'birth_date': this.dateToTimestamp(this.animal.birth_date),
      'entrance_date': this.dateToTimestamp(this.animal.entrance_date),
      'adoption_date': null,
      'status': 2,
      'description': this.animal.description.trim(),
      'user_id': this.authService.userIdLogged(),
    };

    return adoptData;
  }

  adoptAnimal() {
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    const message = `¿Seguro que quieres pre-adoptar el animal?`;
    const dialogData = new ConfirmDialogModel('Pre-adoptar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirm => {

      if (confirm) {

        this.animal = this.prepareAdoptData();
        const animalJSON = JSON.stringify(this.animal);
        console.log('JSON: ', animalJSON);

        this.animalService.updateAnimal(animalJSON).subscribe(resp => {
          console.log('resp adopt: ', resp);
          this.adoptError = false;
          this.openDialog();
        },
        error => {
          console.log('Error: ', error);
          this.adoptError = true;
          this.openDialog();
        });
      }

    });
  }

  openDialog() {

    if (this.adoptError) {
      this.confirmMessage = 'Error al preadoptar el animal';
    } else {
      this.confirmMessage = 'El animal ha sido pre-adoptado';
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.confirmMessage;

    this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
