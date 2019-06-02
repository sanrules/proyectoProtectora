import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatSelectModule,
  MatStepperModule,
  MatProgressBarModule,
  MatExpansionModule

} from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatStepperModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatStepperModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ]
})

export class MaterialModule {}
