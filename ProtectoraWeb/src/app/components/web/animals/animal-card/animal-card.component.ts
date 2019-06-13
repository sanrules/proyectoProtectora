import { OnInit, Component, Input } from '@angular/core';
import { AnimalService } from '../../../../_services/animals/animal/animal-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-animal-card',
    templateUrl: './animal-card.component.html',
    styleUrls: ['./animal-card.component.css']
  })
  export class AnimalCardComponent implements OnInit {

    @Input() animal: any = {};
    @Input() index: number;
    @Input() from: string;

    public animales: Observable<any>;

    constructor(private animalService: AnimalService) {

    }

    ngOnInit() {
      this.animales = this.animalService.getAnimals();
    }

  }
