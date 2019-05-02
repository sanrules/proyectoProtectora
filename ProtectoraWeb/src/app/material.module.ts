import { NgModule } from '@angular/core';

import {
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MAT_DATE_LOCALE,
	MatButtonModule
} from '@angular/material';

@NgModule({
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule
	],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
	]
})

export class MaterialModule {}
