import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from 'src/app/services/user/user-service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin/user/management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  usuarios: any;
  displayedColumns: string[] = ['id', 'user', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource(this.usuarios);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.usuarios = this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data as User[];
      console.log('datasource: ', this.dataSource.data);
      },
      error => {
        console.log('Error: ', error);
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

}
