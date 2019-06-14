// Angular Core imports
import { Component, OnInit, ViewChild } from '@angular/core';
// Component import
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
// Interface import
import { User } from '../../../../_models/user.model';
// Service import
import { UserService } from 'src/app/_services/user/user-service';
// Angular Material import
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterConfirmationComponent } from 'src/app/components/shared/register-confirmation/register-confirmation.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';

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
  confirmMessage: string;
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
    dialogConfig.autoFocus = false;
    this.dialog.open(AdminUserUpdateComponent, dialogConfig);
  }
  userDelete(id){

    this.openConfirmDialog(id);
  }

  openConfirmDialog(id) {
    const message = `¿Seguro que quieres borrar el usuario?`;
    const dialogData = new ConfirmDialogModel('Pre-adoptar', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirm => {

      if (confirm) {
        this.userService.deleteUser(id).subscribe( e => {

          this.openDialog(e , 1);
          this.ngOnInit();
          }, error => {
          this.openDialog(error , 2);
          });
      }

    });
  }

  openDialog(aux , type) {
   
      if ( (aux !== undefined && type === 1) || (aux === undefined && type === 2) ) {
      this.confirmMessage =
      'El usuario se ha eliminado correctamente';
    } else {
      this.confirmMessage =
      'El ha habido un error al eliminar el usuario';
    }
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
      dialogConfig.data = this.confirmMessage;

      this.dialog.open(RegisterConfirmationComponent, dialogConfig);
  }

}
