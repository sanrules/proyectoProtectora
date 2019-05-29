import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';



import { AnimalTypeService } from 'src/app/_services/tipo-animal/animal-type-service';
import { Type } from 'src/app/_models/type.model';
import { NewsUpdateModal } from './news-modal/news-modal.component';


@Component({
    selector: 'app-admin/animal-type/management',
    templateUrl: './news-management.component.html',
    styleUrls: ['./news-management.component.css']
  })
  export class NewsManagementComponent implements OnInit {

    tipos: any;
    displayedColumns: string[] = ['id', 'name' , 'acces', 'delete'];
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
      this.dialog.open(NewsUpdateModal, dialogConfig);

    }

}
