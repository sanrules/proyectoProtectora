import { OnInit, Component, ViewChild } from '@angular/core';
import { AnimalService } from '../../../../_services/animal/animal-service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { Animal } from 'src/app/_models/animal.model';
import { Observable } from 'rxjs';
import { FormularioAnimalModal } from './formulario-animal-modal/formulario-animal-modal.component';


@Component({
    selector: 'app-admin/animal/management',
    templateUrl: './animal-management.component.html',
    styleUrls: ['./animal-management.component.css']
  })
  export class AnimalManagementComponent implements OnInit {

    animales: any;
    displayedColumns: string[] = ['id', 'name', 'type', 'breed', 'birthDate', 'entranceDate', 'acces', 'delete'];
    dataSource = new MatTableDataSource(this.animales);

    constructor(private animalService: AnimalService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.animales = this.animalService.getAnimals().subscribe(data => {
        this.dataSource.data = data.response as Animal[];

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
    openModal(animales) {
      console.log('row: ', animales);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.height = '80%';
      dialogConfig.width = '80%';
      dialogConfig.data = animales;
      this.dialog.open(FormularioAnimalModal, dialogConfig);
    }

}
