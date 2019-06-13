import { OnInit, Component, Input } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
  })
export class AnimalListComponent implements OnInit {

  /* public animalList: Animal []; */
  public animalList: any[] = [];
  public animalType: any;
  public from: string;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private imgService: ImagesService) {
  }

  ngOnInit() {

    this.route.params.subscribe(type => {
      this.animalType = +type.type;
      this.from = 'list';
      if (this.animalType !== 0) {
        this.animalService.getAnimalByType(this.animalType).subscribe(animals => {
          this.animalList = animals['response'];

          this.animalList.forEach(animal => {
            this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
              animal.image = imgAnimal.response[0].image;
            });
          });

        });
      } else {
        this.animalService.getAnimalByStatus(1).subscribe(animals => {
          this.animalList = animals['response'];

          this.animalList.forEach(animal => {
            this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
              animal.image = imgAnimal.response[0].image;
            });
          });

        });
      }

    });


  }


}

