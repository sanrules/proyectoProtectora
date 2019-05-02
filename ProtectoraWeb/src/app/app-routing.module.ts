import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { RegisterAnimalComponent } from './components/animals/register/register_animal.component';

const routes: Routes = [
  {path: 'home', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register-animal', component: RegisterAnimalComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
