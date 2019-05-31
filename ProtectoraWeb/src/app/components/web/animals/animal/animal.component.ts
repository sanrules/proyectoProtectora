import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animal } from 'src/app/_models/animal.model';
import { AnimalService } from 'src/app/_services/animal/animal-service';


@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  animal: any;

  constructor(private route: ActivatedRoute, private animalService: AnimalService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {

      this.animalService.getAnimalById(parametros.id).subscribe(anim => {
        this.animal = anim;
        console.log('animal: ', this.animal);
      });

    });
  }

}
