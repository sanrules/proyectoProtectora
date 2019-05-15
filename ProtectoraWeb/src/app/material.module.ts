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
<<<<<<< HEAD
	MatRadioModule
=======
	MatSortModule,
	MatRadioModule,
	MatIconModule

>>>>>>> dev
} from '@angular/material';

@NgModule({
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
<<<<<<< HEAD
		MatRadioModule
=======
		MatSortModule,
		MatRadioModule,
		MatIconModule
>>>>>>> dev
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
<<<<<<< HEAD
		MatRadioModule
=======
		MatSortModule,
		MatRadioModule,
		MatIconModule
>>>>>>> dev
	],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
	]
})

export class MaterialModule {}
