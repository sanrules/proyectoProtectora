import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
// Componentes Core
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MaterialModule } from './material.module';

// Firebase
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

// Avatar
import { AvatarModule } from 'ngx-avatar';

// NBG
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Fullpage
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

// Componentes Web
// Auth
import { HomeComponent } from './components/web/home/home.component';
import { LoginComponent } from './components/web/auth/login/login.component';
// User
import { UserRegisterComponent } from './components/web/auth/register/user-register.component';
import { UserProfileComponent } from './components/web/users/user-profile/user-profile.component';
import { UserUpdateComponent } from './components/web/users/user-profile/user-update/user-update.component';
import { AdoptedAnimalsComponent } from './components/web/users/user-profile/adopted-animals/adopted-animals.component';
// Animal
import { AnimalListComponent } from './components/web/animals/animal-list/animal-list.component';
import { AnimalComponent } from './components/web/animals/animal/animal.component';
import { AnimalCardComponent } from './components/web/animals/animal-card/animal-card.component';
import { AnimalImagesComponent } from './components/web/animals/animal/animal-images/animal-images.component';
import { CommentsComponent } from './components/web/animals/animal/comments/comments.component';



// Componentes Admin
import { AdministratorNavbarComponent } from './components/admin/navbar/administrator-navbar.component';
// User
import { AdminUserRegisterComponent } from './components/admin/users/user-register/admin-user-register.component';
import { UserManagementComponent } from './components/admin/users/user-management/user-management.component';
import { AdminUserUpdateComponent } from './components/admin/users/user-management/admin-user-update/admin-user-update.component';
// Animals
import { AnimalRegisterComponent } from './components/admin/animals/animal-register/animal-register.component';
import { AnimalManagementComponent } from './components/admin/animals/animal-management/animal-management.component';
// tslint:disable-next-line: max-line-length
import { AnimalUpdateComponent } from './components/admin/animals/animal-management/animal-update/animal-update.component';
// Tipo de animal
import { AnimalTypeRegisterComponent } from './components/admin/animal-type/animal-type-register/animal-type-register.component';
import { AnimalTypeManagementComponent } from './components/admin/animal-type/animal-type-management/animal-type-management.component';
// tslint:disable-next-line: max-line-length
import { AnimalTypeUpdateComponent } from './components/admin/animal-type/animal-type-management/animal-type-update/animal-type-update.component';
// Raza
import { AnimalBreedRegisterComponent } from './components/admin/animal-breed/animal-breed-register/animal-breed-register.component';
import { AnimalBreedManagementComponent } from './components/admin/animal-breed/animal-breed-management/animal-breed-management.component';
// tslint:disable-next-line: max-line-length
import { AnimalBreedUpdateComponent } from './components/admin/animal-breed/animal-breed-management/animal-breed-update/animal-breed-update.component';
// Noticias
import { NewsManagementComponent } from './components/admin/news/news-mangement/news-management.component';
import { NewsRegisterComponent } from './components/admin/news/news-register/news-register.component';
import { NewsUpdateComponent } from './components/admin/news/news-mangement/news-update/news-update.component';

// Componentes Shared
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { AutofocusDirective } from './_directives/autofocus.directive';
import { RegisterConfirmationComponent } from './components/shared/register-confirmation/register-confirmation.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

// Pipes
import { UserIdToNamePipe } from './_pipes/user-id-to-name.pipe';
import { AnimalStatusNamePipe } from './_pipes/animal-status-name.pipe';
import { AnimalTypeNamePipe } from './_pipes/animal-type-name.pipe';
import { AnimalBreedNamePipe } from './_pipes/animal-breed-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdministratorNavbarComponent,
    RegisterConfirmationComponent,
    AnimalRegisterComponent,
    AnimalManagementComponent,
    AnimalUpdateComponent,
    AdminUserRegisterComponent,
    UserManagementComponent,
    AdminUserUpdateComponent,
    AnimalTypeRegisterComponent,
    AnimalTypeManagementComponent,
    AnimalTypeUpdateComponent,
    AnimalBreedRegisterComponent,
    AnimalBreedManagementComponent,
    AnimalBreedUpdateComponent,
    NewsManagementComponent,
    NewsRegisterComponent,
    NewsUpdateComponent,
    HomeComponent,
    LoginComponent,
    UserRegisterComponent,
    AnimalListComponent,
    AnimalCardComponent,
    AnimalComponent,
    AnimalImagesComponent,
    CommentsComponent,
    UserProfileComponent,
    UserUpdateComponent,
    AdoptedAnimalsComponent,
    AutofocusDirective,
    UserIdToNamePipe,
    AnimalStatusNamePipe,
    AnimalTypeNamePipe,
    AnimalBreedNamePipe,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AvatarModule,
    NgbModule.forRoot(),
    AngularFullpageModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterConfirmationComponent,
    LoginComponent,
    AdminUserUpdateComponent,
    AnimalUpdateComponent,
    AnimalTypeUpdateComponent,
    AnimalBreedUpdateComponent,
    NewsUpdateComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule {}
