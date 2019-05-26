import { OnInit, Component, Input } from '@angular/core';
import { AnimalService } from '../../../../_services/animal/animal-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-animal-card',
    templateUrl: './animal-card.component.html',
    styleUrls: ['./animal-card.component.css']
  })
  export class AnimalCardComponent implements OnInit {

@Input() dato: any = {};
@Input() index: number;
    public animales: Observable<any>;
    constructor(private animalService: AnimalService){

    }

    ngOnInit() {
        this.animales = this.animalService.getAnimals();
    }

  }