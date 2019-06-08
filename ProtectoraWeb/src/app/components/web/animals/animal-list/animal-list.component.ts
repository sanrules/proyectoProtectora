import { OnInit, Component } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { Animal } from 'src/app/_models/animal.model';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
  })
  export class AnimalListComponent implements OnInit {

    public animalList: Animal [];
    constructor(private animalService: AnimalService,
                private imgService: ImagesService) {

    }

    ngOnInit() {
      this.animalService.getAnimals().subscribe(animals => {
        this.animalList = animals.response;
        this.animalList.forEach(animal => {

          this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
            console.log(imgAnimal);
            animal.pictures = imgAnimal.response[0].image;
            console.log('animales: ', this.animalList);
          });
        });
      });
    }

  }
