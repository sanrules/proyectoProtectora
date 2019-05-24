import { OnInit, Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { FormularioAnimalTypeUpdateModal } from './animal-type-update-modal/animal-type-update-modal.component';
import { AnimalTypeService } from 'src/app/services/tipo-animal/animal-type-service';
import { Type } from 'src/app/models/type.model';




@Component({
    selector: 'app-admin/animal-type/management',
    templateUrl: './animal-type-management.component.html',
    styleUrls: ['./animal-type-management.component.css']
  })
  export class AnimalTypeManagementComponent implements OnInit {

    tipos: any;
    displayedColumns: string[] = ['id', 'name' , 'acces', 'delete'];
    dataSource = new MatTableDataSource(this.tipos);

    constructor(private animalTypeService: AnimalTypeService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
 
    ngOnInit() {
        this.tipos = this.animalTypeService.getAnimalTypes().subscribe(data => {
        this.dataSource.data = data as Type[];

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
      console.log("row: ", types);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.height = "80%"
      dialogConfig.width = "80%";
      dialogConfig.data = types;
      this.dialog.open(FormularioAnimalTypeUpdateModal, dialogConfig);
      
    }

}
