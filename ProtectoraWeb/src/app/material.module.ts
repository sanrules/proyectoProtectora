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
	MatIconModule

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
		MatSortModule,
		MatRadioModule,
		MatIconModule
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
		MatIconModule
	],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
	]
})

export class MaterialModule {}
