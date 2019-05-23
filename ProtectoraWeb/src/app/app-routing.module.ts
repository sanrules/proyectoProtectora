import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/web/home/home.component';
import { UserRegisterComponent } from './components/web/auth/register/user-register.component';
import { AdminUserRegisterComponent } from './components/admin/users/user-register/admin-user-register.component';
import { UserManagementComponent } from './components/admin/users/user-management/user-management.component';
import { AnimalRegisterComponent } from './components/admin/animals/animal-register/animal-register.component';
import { AnimalManagementComponent } from './components/admin/animals/animal-management/animal-management.component';
import { AnimalListComponent } from './components/web/animals/animal-list/animal-list.component';
import { AnimalComponent } from './components/web/animals/animal/animal.component';
import { AnimalTypeManagementComponent } from './components/admin/animal-type/animal-type-management/animal-type-management.component';
import { AnimalTypeRegisterComponent } from './components/admin/animal-type/animal-type-register/animal-type-register.component';
import { AnimalBreedManagementComponent } from './components/admin/animal-breed/animal-breed-management/animal-breed-management.component';
import { AnimalBreedRegisterComponent } from './components/admin/animal-breed/animal-breed-register/animal-breed-register.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: UserRegisterComponent},
  {path: 'admin/user/register', component: AdminUserRegisterComponent},
  {path: 'admin/user/management', component: UserManagementComponent},
  {path: 'admin/animal/register', component: AnimalRegisterComponent},
  {path: 'admin/animal/management', component: AnimalManagementComponent},
  {path: 'admin/animal-type/management', component: AnimalTypeManagementComponent},
  {path: 'admin/animal-type/register', component: AnimalTypeRegisterComponent},
  {path: 'admin/animal-breed/management', component: AnimalBreedManagementComponent},
  {path: 'admin/animal-breed/register', component: AnimalBreedRegisterComponent},
  {path: 'animals/list', component: AnimalListComponent},
  {path: 'animals/animal/:id', component: AnimalComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
