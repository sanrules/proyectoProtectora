import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { RegisterUserComponent } from './components/user/register/register-user.component';
import { RegisterAnimalComponent } from './components/animals/register/register-animal.component';
import { AdminUserRegisterComponent } from './components/administrator/admin-user-register/admin-user-register.component';
import { AdminUserManagementComponent } from './components/administrator/admin-user-management/admin-user-management.component';
import { AdminAnimalManagementComponent } from './components/administrator/admin-animal-management/admin-animal-management.component';

const routes: Routes = [
  {path: 'home', component: RegisterUserComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'admin-user-register', component: AdminUserRegisterComponent},
  {path: 'admin-user-management', component: AdminUserManagementComponent},
  {path: 'admin-animal-register', component: RegisterAnimalComponent},
  {path: 'admin-animal-management', component: AdminAnimalManagementComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
