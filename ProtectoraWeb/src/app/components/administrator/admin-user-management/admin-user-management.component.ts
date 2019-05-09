import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from 'src/app/services/user/user-service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  usuarios: any;
  displayedColumns: string[] = ['id', 'user', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource(this.usuarios);

  constructor(private userService: UserService) { }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {

    this.usuarios = this.userService.getUsers().subscribe(data => {
      console.log('repuesta getUser(): ', data);
      },
      error => {
        console.log('Error: ', error);
      }
    );
    this.dataSource.sort = this.sort;
  }


}
