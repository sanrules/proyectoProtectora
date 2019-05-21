import { OnInit, Component } from '@angular/core';
import { AnimalService } from '../../../../services/animal/animal-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-animal-list/web/animal',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
  })
  export class AnimalListComponent implements OnInit {

    public animales: any [];
    constructor(private animalService: AnimalService){

    }

    ngOnInit() {
        this.animalService.getAnimals().subscribe( e =>{
          this.animales = e;
        });
    }

  }
