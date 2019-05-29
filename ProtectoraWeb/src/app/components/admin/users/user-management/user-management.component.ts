// Angular Core imports
import { Component, OnInit, ViewChild } from '@angular/core';
// Component import
import { UserUpdateModalComponent } from './user-update-modal/user-update-modal.component';
// Interface import
import { User } from '../../../../_models/user.model';
// Service import
import { UserService } from 'src/app/_services/user/user-service';
// Angular Material import
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-admin/user/management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  // Filtro y paginación de la tabla
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Variables
  users: any;
  displayedColumns: string[] = ['id', 'user', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource(this.users);

  constructor(
                private userService: UserService,
                private dialog: MatDialog
             ) { }

  ngOnInit() {
    // Se recuperan los datos de todos los usuarios para enviarlos a la tabla
    this.users = this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data.response as User[];
      console.log('datasource: ', this.dataSource.data);
      },
      error => {
        console.error('Error: ', error);
      }
    );
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

  // Abre el modal de modificar usuario
  openModal(users) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '80%';
    dialogConfig.width = '80%';
    dialogConfig.data = users;
    this.dialog.open(UserUpdateModalComponent, dialogConfig);
  }

}
