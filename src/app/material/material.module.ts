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
	  MatPaginatorModule
	} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [            
            MatTableModule,
            MatCheckboxModule,
            MatSortModule,
            MatPaginatorModule
          ],
  declarations: []
})
export class MaterialModule { }
