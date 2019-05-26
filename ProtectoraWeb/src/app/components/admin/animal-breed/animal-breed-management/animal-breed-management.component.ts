import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { AnimalBreedService } from '../../../../services/raza-animal/animal-raza-service';
import { Breed } from 'src/app/models/breed.model';
import { FormularioAnimalBreedUpdateModal } from './animal-breed-update-modal/animal-breed-update-modal.component';

@Component({
    selector: 'app-admin/animal-breed/management',
    templateUrl: './animal-breed-management.component.html',
    styleUrls: ['./animal-breed-management.component.css']
  })
  export class AnimalBreedManagementComponent implements OnInit {

    razas: any;
    displayedColumns: string[] = ['id', 'idtype', 'name' , 'acces', 'delete'];
    dataSource = new MatTableDataSource(this.razas);

    constructor(private animalBreedService: AnimalBreedService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.razas = this.animalBreedService.getAnimalBreeds().subscribe(data => {
        this.dataSource.data = data as Breed[];

        console.log('repuesta getAnimals(): ', this.dataSource.data);
        },
        error => {
          console.log('Error: ', error);
        }

      );


    }
      ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    openModal(razas) {
      console.log("row: ", razas);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.height = "80%"
      dialogConfig.width = "80%";
      dialogConfig.data = razas;
      this.dialog.open(FormularioAnimalBreedUpdateModal, dialogConfig);

    }

}