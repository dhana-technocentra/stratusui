import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core';
import { TicketService } from './../ticket.service';
import { SupportTicket } from './../../core/models';

const CREATE_NEWTICKET = "Support ticket has been created successfully";

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  newTicketForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.newTicketForm = this.getFormGroup();
}

getFormGroup(){
  return this.formBuilder.group({
    ponNumber : [''],
    severityParmValue: [''],
    shortDescription: [''],
    fullDescription: [''],
    contactPersonName: [''],
    phoneNumber: [''],
    operationHours: ['']
  });
}

// Executed When Form Is Submitted  
onFormSubmit(form: NgForm) {
  console.log(form);
  this.submitted = true;

  if (this.newTicketForm.invalid) {
    return;
  }

  this.loading = true;
  this.ticketService.openNewTicket(this.newTicketForm.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log('create new support ticket result ', data);
        this.alertService.success(CREATE_NEWTICKET, true);

      },
      error => {
        console.log('create support ticket failure ', error);
        this.alertService.error(error);
        this.loading = false;
      });
}
}
