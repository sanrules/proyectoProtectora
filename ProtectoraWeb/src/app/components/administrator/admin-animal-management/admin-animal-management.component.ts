import { OnInit, Component, ViewChild } from '@angular/core';
import { AnimalService } from '../../../services/animal/animal-service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Animal } from 'src/app/models/animal.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin-animal-management',
    templateUrl: './admin-animal-management.component.html',
    styleUrls: ['./admin-animal-management.component.css']
  })
  export class AdminAnimalManagementComponent implements OnInit {

    animales: any;
    displayedColumns: string[] = ['id', 'name', 'type', 'breed', 'birthDate', 'entarnceDate', 'update', 'delete'];
    constructor(private animalService: AnimalService) { }
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngOnInit() {
      this.animales = this.animalService.getAnimals().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        console.log(data);
        console.log('repuesta getAnimals(): ', data);
        },
        error => {
          console.log('Error: ', error);
        }

      );


    }
}
