import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animal } from 'src/app/_models/animal.model';
import { AnimalService } from 'src/app/_services/animals/animal/animal-service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../../../../_services/animals/images/images.service';
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  animal: any;
  images: any[];
  public animalId: number;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private imgService: ImagesService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {

      this.animalService.getAnimalById(parametros.id).subscribe(anim => {
        this.animal = anim['response'];
        this.animalId = this.animal.id;

        this.imgService.getImagesByAnimal(this.animal.id).subscribe(resp => {
          this.images = resp.response;
        });

      });


    });
  }

}
