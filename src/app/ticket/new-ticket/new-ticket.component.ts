import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../core';
import { TicketService } from './../ticket.service';
import { SupportTicket } from './../../core/models';
import { AppComponent } from './../../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng6-toastr';
import { InventoryService } from './../../core/services/inventory.service';
@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  newTicketForm: FormGroup;
  loading = false;
  submitted = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  severities = ["No Impact", "Minor", "Major", "Critical"];
  ponNumbers: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService, private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService,  public toastr: ToastsManager, vcr: ViewContainerRef, private userService: UserService, private inventoryService: InventoryService) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.spinnerService.show();
    this.newTicketForm = this.formBuilder.group({
      ponNumber: ['', [Validators.required]],
      servrityParmValue: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      fullDescription: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(14)]],
      operationHours: ['', [Validators.required]]
    });
    this.appComponent.title = "Create Ticket";
    this.userService.getUserProfile().subscribe(data => {
      this.inventoryService.getPONsByCompanyId(data["companyId"]).subscribe(data1 => {
        this.ponNumbers = data1;
        this.spinnerService.hide();
      })
    });
  }

  showError(errorMessage) {
    this.toastr.error(errorMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  showSuccess(successMessage) {
    this.toastr.success(successMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  get f() { return this.newTicketForm.controls; }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.spinnerService.show();
    if (this.newTicketForm.invalid) {
      this.spinnerService.hide();
      return;
    }
    this.ticketService.openNewTicket(this.newTicketForm.value)
      .pipe(first())
      .subscribe(
        data => {
          let control: AbstractControl = null;
          this.newTicketForm.reset();
          this.newTicketForm.markAsUntouched();
          Object.keys(this.newTicketForm.controls).forEach((name) => {
            control = this.newTicketForm.controls[name];
            control.setErrors(null);
          });
          this.spinnerService.hide();
          
          this.showSuccess("Submitted Successfully");
          console.log('create new support ticket result ', data);

        },
        error => {
          this.spinnerService.hide();
          this.showSuccess(error);
          console.log('create support ticket failure ', error);
        });
  }

  inventoryNavigation() {
    this.router.navigate(['/inventory', {}]);
  }
}
