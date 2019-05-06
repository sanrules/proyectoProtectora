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
import { RegisterComponent } from './components/user/register/register.component';
import { RegisterAnimalComponent } from './components/animals/register/register-animal.component';

// Modelos
//import { UserModel } from './models/user-model';
//import { User } from './models/user';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterAnimalComponent,
    NavbarComponent
    //UserModel
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
  bootstrap: [AppComponent]
})
export class AppModule {}
