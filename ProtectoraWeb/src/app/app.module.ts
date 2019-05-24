import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MaterialModule } from './material.module';

// Componentes Core
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Componentes Web
import { HomeComponent } from './components/web/home/home.component';
import { LoginComponent } from './components/web/auth/login/login.component';
import { UserRegisterComponent } from './components/web/auth/register/user-register.component';
import { AnimalListComponent } from './components/web/animals/animal-list/animal-list.component';
import { AnimalComponent } from './components/web/animals/animal/animal.component';
import { AnimalCardComponent } from './components/web/animals/animal-card/animal-card.component';

// Componentes Admin
import { AdministratorNavbarComponent } from './components/admin/navbar/administrator-navbar.component';
import { AnimalManagementComponent } from './components/admin/animals/animal-management/animal-management.component';
import { FormularioAnimalModal } from './components/shared/formulario-animal-modal/formulario-animal-modal.component';
import { AnimalRegisterComponent } from './components/admin/animals/animal-register/animal-register.component';
import { UserManagementComponent } from './components/admin/users/user-management/user-management.component';
import { AdminUserRegisterComponent } from './components/admin/users/user-register/admin-user-register.component';
import { UserUpdateModalComponent } from './components/admin/users/user-management/user-update-modal/user-update-modal.component';
import { RegisterConfirmationComponent } from './components/web/auth/register/register-confirmation/register-confirmation.component';
import { AnimalTypeManagementComponent } from './components/admin/animal-type/animal-type-management/animal-type-management.component';
import { AnimalTypeRegisterComponent } from './components/admin/animal-type/animal-type-register/animal-type-register.component';
import { AnimalBreedRegisterComponent } from './components/admin/animal-breed/animal-breed-register/animal-breed-register.component';
import { AnimalBreedManagementComponent } from './components/admin/animal-breed/animal-breed-management/animal-breed-management.component';

// Componentes Shared
import { UserFormComponent } from './components/shared/forms/user/user-form.component';
import { AnimalFormComponent } from './components/shared/forms/animal/animal-form.component';
import { FormularioAnimalBreedUpdateModal } from './components/admin/animal-breed/animal-breed-management/animal-breed-update-modal/animal-breed-update-modal.component';
import { FormularioAnimalTypeUpdateModal } from './components/admin/animal-type/animal-type-management/animal-type-update-modal/animal-type-update-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnimalManagementComponent,
    AnimalRegisterComponent,
    UserRegisterComponent,
    AdministratorNavbarComponent,
    AdminUserRegisterComponent,
    UserManagementComponent,
    FormularioAnimalModal,
    AnimalFormComponent,
    UserFormComponent,
    UserUpdateModalComponent,
    AnimalListComponent,
    AnimalComponent,
    AnimalCardComponent,
    HomeComponent,
    RegisterConfirmationComponent,
    LoginComponent,
    AnimalTypeManagementComponent,
    AnimalTypeRegisterComponent,
    AnimalBreedRegisterComponent,
    AnimalBreedManagementComponent,
    FormularioAnimalBreedUpdateModal,
    FormularioAnimalTypeUpdateModal

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
  entryComponents: [
    FormularioAnimalModal,
    UserUpdateModalComponent,
    RegisterConfirmationComponent,
    LoginComponent,
    UserUpdateModalComponent,
    FormularioAnimalTypeUpdateModal,
    FormularioAnimalBreedUpdateModal

  ]
})
export class AppModule {}
