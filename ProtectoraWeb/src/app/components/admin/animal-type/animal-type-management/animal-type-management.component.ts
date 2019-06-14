import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';

// import { AnimalService } from '../../../../_services/animal/animal-service';
// import { Animal } from 'src/app/_models/animal.model';
// import { Observable } from 'rxjs';
// import { FormularioAnimalModal } from '../../../shared/formulario-animal-modal/formulario-animal-modal.component'; */
import { AnimalTypeUpdateComponent } from './animal-type-update/animal-type-update.component';
import { AnimalTypeService } from 'src/app/_services/animals/tipo-animal/animal-type-service';
import { Type } from 'src/app/_models/type.model';


@Component({
    selector: 'app-admin-animal-type-management',
    templateUrl: './animal-type-management.component.html',
    styleUrls: ['./animal-type-management.component.css']
  })
  export class AnimalTypeManagementComponent implements OnInit {

    tipos: any;
    displayedColumns: string[] = ['id', 'name' , 'acces'];
    dataSource = new MatTableDataSource(this.tipos);

    constructor(private animalTypeService: AnimalTypeService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.tipos = this.animalTypeService.getAnimalTypes().subscribe(data => {
      this.dataSource.data = data.response as Type[];

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

    openModal(types) {

      console.log('row: ', types);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.height = '80%';
      dialogConfig.width = '80%';
      dialogConfig.data = types;
      this.dialog.open(AnimalTypeUpdateComponent, dialogConfig);

    }

}
