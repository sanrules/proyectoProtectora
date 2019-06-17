import { OnInit, Component, Input } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentFactoryResolver } from '@angular/core/src/render3';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  /* public animalList: Animal []; */
  public animalList: any[] = [];
  public animals: any[] = [];
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
        console.log('from: ', this.from);
        this.animalService.getAnimalByType(this.animalType).subscribe(animals => {
          this.animals = animals['response'];

          this.animals.forEach(animal => {
            if (+animal.status === 1) {
              this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
                animal.image = imgAnimal.response[0].image;
                this.animalList.push(animal);
              });
            }
          });
          console.log('animalList', this.animalList);
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

