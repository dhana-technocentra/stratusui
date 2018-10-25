import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../core';
import { TicketService } from './ticket.service';
import { Ticket, Incident, TicketNotes } from './../core/models';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  ticketNotes: any;
  incidents: Incident[];
  loading = false;
  submitted = false;
  columnsToDisplay = ["ID", "Name", "Date", "Details"];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.title = "Support";
    this.ticketNotes = [{"id":"#732714", "name": "Test McTest", "date": "Today", "Details": "this is a test details required to open a ticket and generate values"},{"id":"#732715", "name": "Test McTest", "date": "10/12/2018", "Details": "this is a test details required to open a ticket and generate values"},{"id":"#732716", "name": "Test McTest", "date": "9/23/2018", "Details": "this is a test details required to open a ticket and generate values"},{"id":"#732717", "name": "Test McTest", "date": "9/6/2018", "Details": "this is a test details required to open a ticket and generate values"}]
  }

  navigateToCreateTicket() {
    
  }


}
