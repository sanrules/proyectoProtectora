import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'animalTypeNamePipe'})
export class AnimalTypeNamePipe implements PipeTransform {

  transform(typeAnimal: number): string {

    switch (+typeAnimal) {
      case 1:
        return 'Gato';
      case 2:
        return 'Perro';
      case 3:
        return 'Otros';
      default:
        return 'Sin datos';
    }

  }

}
