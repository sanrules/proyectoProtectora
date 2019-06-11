import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'animalStatusNamePipe'})
export class AnimalStatusNamePipe implements PipeTransform {

  transform(status: number): string {

    switch (+status) {
      case 0:
        return 'En adopción';
      case 1:
        return 'Pre-adoptado';
      case 2:
        return 'Adoptado';
      default:
        return 'Sin datos';
    }

  }

}
