import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	  MatAutocompleteModule,
	  MatButtonModule,
	  MatButtonToggleModule,
	  MatCardModule,
	  MatCheckboxModule,
	  MatChipsModule,
	  MatDatepickerModule,
	  MatDialogModule,
	  MatExpansionModule,
	  MatGridListModule,
	  MatIconModule,
	  MatInputModule,
	  MatListModule,
	  MatMenuModule,
	  MatNativeDateModule,
	  MatProgressBarModule,
	  MatProgressSpinnerModule,
	  MatRadioModule,
	  MatRippleModule,
	  MatSelectModule,
	  MatSidenavModule,
	  MatSliderModule,
	  MatSlideToggleModule,
	  MatSnackBarModule,
	  MatStepperModule,
	  MatTableModule,
	  MatTabsModule,
	  MatToolbarModule,
	  MatTooltipModule,
	  MatSortModule,
	  MatPaginatorModule,
		MatFormFieldModule,
		MatOptionModule
		
	} from '@angular/material';

import { MatMomentDateModule} from '@angular/material-moment-adapter';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
		MatPaginatorModule,
		MatCardModule,
		MatFormFieldModule,
		MatSlideToggleModule,
		MatOptionModule,
    		MatSelectModule,
			MatInputModule,
			MatDatepickerModule,
			MatMomentDateModule
  ],
  exports: [            
            MatTableModule,
            MatCheckboxModule,
            MatSortModule,
			MatPaginatorModule,
			MatCardModule,
			MatFormFieldModule,
			MatSlideToggleModule,
			MatOptionModule,
    		MatSelectModule,
			MatInputModule,
			MatDatepickerModule
		  ],		 
  declarations: []
})
export class MaterialModule { }
