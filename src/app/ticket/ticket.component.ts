import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../core';
import { TicketService } from './ticket.service';
import { Ticket, Incident,TicketNotes } from './../core/models';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  ticketNotes: TicketNotes;
  incidents: Incident[];
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService) { }

  ngOnInit() {

    this.ticketForm = this.getFormGroup();
    
    const queryParms = this.route.snapshot.queryParams;
    console.log('ticket queryParms',queryParms);
    const companyId = (queryParms.companyId) ? queryParms.companyId : null;

    console.log('ticket companyId',companyId);
    if (queryParms.companyId) {
      this.ticketService.getTicketNotes(companyId)
        .subscribe(data => {
          console.log('ticket');
          this.getTicketNotes(data);
         
        });
    }
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

  getTicketNotes(data){
    this.ticketNotes = new TicketNotes();
    this.ticketNotes.openActiveTickets = data['openActiveTickets'];
    //this.ticketNotes.openActiveTickets.incidents = this.getIncidents(data['openActiveTickets']['incidents']);
    
    if( data['openActiveTickets']['count'] != null &&  data['openActiveTickets']['count'] > 0)
    {
        this.ticketNotes.openActiveTickets.count = data['openActiveTickets']['count'];
        console.log('count',this.ticketNotes.openActiveTickets.count);
        this.getIncidents(data['openActiveTickets']['incidents']);
    }
    this.ticketNotes.closedTickets = data['closedTickets'];
  }

  getIncidents(incidents) {    
    Object.keys(incidents).forEach(key => {
      let incident = incidents(key);
      this.ticketNotes.openActiveTickets.incidents.push(new Incident( incident['incidentLogGUID'],incident['incidentID'], incident['attachmentFileType'],
        incident['createdByFullName'],
        incident['createDate'],
        incident['logType'],
        incident['logTypeDescription'],
        incident['billable'],
        incident['publish'],
        incident['longText'],
        incident['minutesSpent'],
        incident['attachmentFileName'],
        incident['createdByType']
      ));      
    });
}

}
