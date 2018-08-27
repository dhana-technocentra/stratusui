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
    		MatInputModule
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
    		MatInputModule
          ],
  declarations: []
})
export class MaterialModule { }
