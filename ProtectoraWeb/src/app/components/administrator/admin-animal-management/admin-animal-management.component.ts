import { OnInit, Component, ViewChild } from '@angular/core';
import { AnimalService } from '../../../services/animal/animal-service';
<<<<<<< HEAD
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Animal } from 'src/app/models/animal.model';
import { Observable } from 'rxjs';
=======
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { Animal } from 'src/app/models/animal.model';
import { Observable } from 'rxjs';
import { FormularioAnimalModal } from '../../shared/formulario-animal-modal/formulario-animal-modal.component';
>>>>>>> dev

@Component({
    selector: 'app-admin-animal-management',
    templateUrl: './admin-animal-management.component.html',
    styleUrls: ['./admin-animal-management.component.css']
  })
  export class AdminAnimalManagementComponent implements OnInit {

    animales: any;
<<<<<<< HEAD
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
=======
    displayedColumns: string[] = ['id', 'name', 'type', 'breed', 'birthDate', 'entranceDate', 'acces', 'delete'];
    dataSource = new MatTableDataSource(this.animales);

    constructor(private animalService: AnimalService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.animales = this.animalService.getAnimals().subscribe(data => {
        this.dataSource.data = data as Animal[];

        console.log('repuesta getAnimals(): ', this.dataSource.data);
>>>>>>> dev
        },
        error => {
          console.log('Error: ', error);
        }

      );


    }
<<<<<<< HEAD
=======
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    openModal(animales) {
      console.log("row: ", animales);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.width = "70%";
      dialogConfig.data = animales;
      this.dialog.open(FormularioAnimalModal, dialogConfig);
    }
    
>>>>>>> dev
}
