import { OnInit, Component } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { ImagesService } from '../../../../_services/animals/images/images.service';
import { Animal } from 'src/app/_models/animal.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
  })
export class AnimalListComponent implements OnInit {

  /* public animalList: Animal []; */
  public animalList: Observable<any>;
  public datosBuscar;
  constructor(private animalService: AnimalService,
              private imgService: ImagesService) {
  }

  ngOnInit() {
    this.animalService.getAnimals().subscribe(animals => {
      this.animalList = animals.response;
      this.animalList.forEach(animal => {

        this.imgService.getImagesByAnimal(animal['id']).subscribe(imgAnimal => {

          animal.pictures = imgAnimal.response[0].image;
        });

      });

  });

  }
  public onModelChange() {
    this.busqueda(this.datosBuscar);
}
  
  public busqueda(valor: string) {
    const a = valor.toLowerCase();
    this.animalList = this.animalService.getAnimals().pipe(
        map(
            result => result.filter(r => {

                return ( r.size.toLowerCase().includes(a) );
            })
        )
    );
}

}

