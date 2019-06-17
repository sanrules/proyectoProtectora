import { OnInit, Component, Input } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { AnimalTypeService } from 'src/app/_services/animals/tipo-animal/animal-type-service';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  /* public animalList: Animal []; */
  public animalList: any[] = [];
  public animals: any[] = [];
  public searchType: any;
  public from: string;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private typeService: AnimalTypeService,
              private imgService: ImagesService) {
  }

  ngOnInit() {

    this.route.params.subscribe(param => {

      this.searchType = +param.type;
      this.from = 'list';
      if (this.searchType === 3) {
        this.animalService.getAnimalByStatus(1).subscribe(animals => {
          this.animals = animals['response'];

          this.animals.forEach(animal => {
            if (+animal.type !== 2 && +animal.type !== 1) {
              this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {
                animal.image = imgAnimal.response[0].image;
                this.animalList.push(animal);
              });
            }
          });
          console.log('animalList', this.animalList);
        });
       } else if (this.searchType !== 0) {
        this.animalService.getAnimalByType(this.searchType).subscribe(animals => {
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

  getCats () {

  }

  getDogs() {

  }

  getOtherTypes () {

  }


}

