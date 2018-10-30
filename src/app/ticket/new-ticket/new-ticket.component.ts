import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core';
import { TicketService } from './../ticket.service';
import { SupportTicket } from './../../core/models';
import { AppComponent } from './../../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng6-toastr';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService, private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService,  public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
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
  }

  showError(errorMessage) {
    this.toastr.error(errorMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  showSuccess(successMessage) {
    this.toastr.success(successMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  severities = ["No Impact", "Minor", "Major", "Critical"];
  ponNumbers = ["1576.02.01.2017", "1576.02.01.2017", "1576.02.01.2017"];

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
}
