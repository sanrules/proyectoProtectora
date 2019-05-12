import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MaterialModule } from './material.module';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegisterUserComponent } from './components/user/register/register-user.component';
import { RegisterAnimalComponent } from './components/administrator/admin-animal-register/register-animal.component';
import { AdministratorNavbarComponent } from './components/administrator/administrator-navbar/administrator-navbar.component';
import { AdminUserRegisterComponent } from './components/administrator/admin-user-register/admin-user-register.component';
import { AdminUserManagementComponent } from './components/administrator/admin-user-management/admin-user-management.component';
import { AdminAnimalManagementComponent } from './components/administrator/admin-animal-management/admin-animal-management.component';
import { FormularioAnimalModal } from './components/shared/formulario-animal-modal/formulario-animal-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    RegisterAnimalComponent,
    NavbarComponent,
    AdministratorNavbarComponent,
    AdminUserRegisterComponent,
    AdminUserManagementComponent,
    AdminAnimalManagementComponent,
    FormularioAnimalModal


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormularioAnimalModal]
})
export class AppModule {}
