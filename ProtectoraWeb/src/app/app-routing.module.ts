import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { UserRegisterComponent } from './components/web/auth/register/user-register.component';
import { AdminUserRegisterComponent } from './components/admin/users/user-register/admin-user-register.component';
import { UserManagementComponent } from './components/admin/users/user-management/user-management.component';
import { AnimalRegisterComponent } from './components/admin/animals/animal-register/animal-register.component';
import { AnimalManagementComponent } from './components/admin/animals/animal-management/animal-management.component';
import { AnimalListComponent } from './components/web/animals/animal-list/animal-list.component';
import { AnimalComponent } from './components/web/animals/animal/animal.component';


const routes: Routes = [
  {path: 'home', component: UserRegisterComponent},
  {path: 'registro', component: UserRegisterComponent},
  {path: 'admin/user/register', component: AdminUserRegisterComponent},
  {path: 'admin/user/management', component: UserManagementComponent},
  {path: 'admin/animal/register', component: AnimalRegisterComponent},
  {path: 'admin/animal/management', component: AnimalManagementComponent},
  {path: 'animals/list', component: AnimalListComponent},
  {path: 'animals/animal/:id', component: AnimalComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
