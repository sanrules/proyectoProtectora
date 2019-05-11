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
	MatRadioModule
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
		MatRadioModule
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
		MatRadioModule
	],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
	]
})

export class MaterialModule {}
