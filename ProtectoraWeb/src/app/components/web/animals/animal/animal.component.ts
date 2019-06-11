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
  animal: any;
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
        this.animal.status = 1;
        this.animal.userId = this.authService.userIdLogged();
        const animalJSON = JSON.stringify(this.animal);
        console.log('JSON: ', animalJSON);
        this.adoptError = false;
        console.log('confirm');
        this.animalService.updateAnimal(animalJSON).subscribe(resp => {
          console.log('resp adopt: ', resp);
          this.adoptError = false;
          this.openDialog();
        },
        error => {
          console.log('Error: ', error);
          this.animal.status = 0;
          this.animal.userId = null;
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
