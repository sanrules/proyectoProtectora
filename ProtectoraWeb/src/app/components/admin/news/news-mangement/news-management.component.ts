import { OnInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { AnimalTypeService } from 'src/app/_services/animals/tipo-animal/animal-type-service';
import { Type } from 'src/app/_models/type.model';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { NewsService } from '../../../../_services/news/news-service';


@Component({
    selector: 'app-admin-news-management',
    templateUrl: './news-management.component.html',
    styleUrls: ['./news-management.component.css']
  })
  export class NewsManagementComponent implements OnInit {

    news: any;
    displayedColumns: string[] = ['id', 'name' , 'newsDate', 'acces', 'delete'];
    dataSource = new MatTableDataSource(this.news);

    constructor(private newsService: NewsService,
                private dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.news = this.newsService.getNews().subscribe(data => {
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

    openModal(news) {

      console.log('row: ', news);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.height = '80%';
      dialogConfig.width = '80%';
      dialogConfig.data = news;
      this.dialog.open(NewsUpdateComponent, dialogConfig);

    }
    deleteNew(id) {
      this.newsService.deleteNew(id).subscribe(data => {

        console.log('respuesta deleteAnimal (data): ', data);
        if (data.response === "delete OK") {
        this.ngOnInit();
        }
      }, error => {
          console.warn('Error: ', error);
      });
  
    }

}
