import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/web/home/home.component';
import { UserRegisterComponent } from './components/web/auth/register/user-register.component';
import { UserProfileComponent } from './components/web/users/user-profile/user-profile.component';

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
import { NewsRegisterComponent } from './components/admin/news/news-register/news-register.component';
import { NewsManagementComponent } from './components/admin/news/news-mangement/news-management.component';
import { AuthGuard } from './_guards/auth-guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/profile/:id', component: UserProfileComponent},
  {path: 'admin/user/register', component: AdminUserRegisterComponent, canActivate: [AuthGuard]} ,
  {path: 'admin/user/management', component: UserManagementComponent, canActivate: [AuthGuard]} ,
  {path: 'admin/animals/register', component: AnimalRegisterComponent, canActivate: [AuthGuard]},
  {path: 'admin/animals/management', component: AnimalManagementComponent, canActivate: [AuthGuard]},
  {path: 'admin/animals-type/register', component: AnimalTypeRegisterComponent, canActivate: [AuthGuard]},
  {path: 'admin/animals-type/management', component: AnimalTypeManagementComponent, canActivate: [AuthGuard]},
  {path: 'admin/animals-breed/register', component: AnimalBreedRegisterComponent, canActivate: [AuthGuard]},
  {path: 'admin/animals-breed/management', component: AnimalBreedManagementComponent, canActivate: [AuthGuard]},
  {path: 'admin/news/register', component: NewsRegisterComponent, canActivate: [AuthGuard]},
  {path: 'admin/news/management', component: NewsManagementComponent, canActivate: [AuthGuard]},
  {path: 'animals/list/:type', component: AnimalListComponent},
  {path: 'animals/animal/:id', component: AnimalComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
