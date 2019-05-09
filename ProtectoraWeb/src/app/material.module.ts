import { NgModule } from '@angular/core';

import {
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MAT_DATE_LOCALE,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule
} from '@angular/material';

@NgModule({
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule
	],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
	]
})

export class MaterialModule {}
