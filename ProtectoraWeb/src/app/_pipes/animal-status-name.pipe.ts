import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'animalStatusNamePipe'})
export class AnimalStatusNamePipe implements PipeTransform {

  transform(status: number): string {

    switch (+status) {
      case 1:
        return 'En adopción';
      case 2:
        return 'Pre-adoptado';
      case 3:
        return 'Adoptado';
      default:
        return 'Sin datos';
    }

  }

}
