import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { AnimalBreedService } from '../_services/animals/animal-breed/animal-breed';

@Pipe({name: 'animalBreedNamePipe'})
export class AnimalBreedNamePipe implements PipeTransform {

  idBreed: number;

  constructor(private animalBreedService: AnimalBreedService) {}

  transform(id: number) {
    this.idBreed = +id;
    return this.animalBreedService.getAnimalBreedById(this.idBreed).pipe(map(breed => breed['response'].name));
  }
}
