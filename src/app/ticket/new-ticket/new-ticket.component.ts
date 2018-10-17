import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core';
import { TicketService } from './../ticket.service';
import { SupportTicket } from './../../core/models';
import { AppComponent } from './../../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    private alertService: AlertService, private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.newTicketForm = this.formBuilder.group({
      ponNumber: ['', Validators.required],
      severityParmValue: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      operationHours: ['', Validators.required]
    });
    this.appComponent.title = "Request A Quote";
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
          console.log('create new support ticket result ', data);

        },
        error => {
          this.spinnerService.hide();
          console.log('create support ticket failure ', error);
        });
  }
}
