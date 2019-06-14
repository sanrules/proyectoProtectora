import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { AnimalTypeService } from '../_services/animals/tipo-animal/animal-type-service';

@Pipe({name: 'animalTypeNamePipe'})
export class AnimalTypeNamePipe implements PipeTransform {

  idType: number;

  constructor(private animalTypeService: AnimalTypeService) {}

  transform(typeAnimal: number) {
    this.idType = +typeAnimal;
    return this.animalTypeService.getAnimalTypeById(this.idType).pipe(map(type => type['response'].name));
  }

}
