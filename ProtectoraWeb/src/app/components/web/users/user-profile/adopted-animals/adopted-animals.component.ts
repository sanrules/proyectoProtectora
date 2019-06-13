import { Component, OnInit, Input } from '@angular/core';
import { Animal } from 'src/app/_models/animal.model';
import { AnimalService } from '../../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../../_services/animals/images/images.service';

@Component({
  selector: 'app-adopted-animals',
  templateUrl: './adopted-animals.component.html',
  styleUrls: ['./adopted-animals.component.css']
})
export class AdoptedAnimalsComponent implements OnInit {

  @Input() userId: number[];
  animalList: Animal[];
  from: string;

  constructor(private animalService: AnimalService,
              private imgService: ImagesService) { }

  ngOnInit() {
    this.from = 'profile';
    this.animalService.getAnimalByUser(this.userId).subscribe(animals => {
      this.animalList = animals['response'];

      this.animalList.forEach(animal => {
        this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
          animal.image = imgAnimal.response[0].image;
        });
      });

    });
  }

}
