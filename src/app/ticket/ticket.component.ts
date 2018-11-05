import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../core';
import { TicketService } from './ticket.service';
import { Ticket, Incident, TicketNotes } from './../core/models';
import { AppComponent } from './../app.component';
import { UserService } from './../core/services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Sort } from '@angular/material';
import {MatSort, MatTableDataSource} from '@angular/material';


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
  userProfile: any;
  companyId: any;
  displayData: any;
  dataExists: any;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private alertService: AlertService, private appComponent: AppComponent, private userService: UserService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.appComponent.title = "Support";
    this.userService.getUserProfile()
      .subscribe(data => {
        this.userProfile = data;
        this.companyId = this.userProfile.companyId;
        this.ticketService.getTicketNotes(this.companyId).subscribe(ticketDetails => {
          this.displayData = true;
          if (ticketDetails["openActiveTickets"].count > 0) {
            this.dataExists = false;
            this.ticketNotes = ticketDetails["openActiveTickets"]["incidents"];
            this.dataSource = new MatTableDataSource(this.ticketNotes);
            this.dataSource.sort = this.sort;
          } else {
            this.dataExists = true;
            this.displayData = false;
          }
          this.spinnerService.hide();
        });
      });
  }

  sortData(sort: Sort) {
    this.spinnerService.show();
    this.ticketNotes = this.ticketNotes.sort((a, b) => {
      const isAsc = sort.direction === 'asc' ? true : false;
      console.log(a);
      switch (sort.active) {
        case 'ID': return this.compare(a.incidentID, b.incidentID, isAsc);
        case 'Name': return this.compare(a.results[0].CreatedByFullName, b.results[0].CreatedByFullName, isAsc);
        case 'Date': return this.compare(a.results[0].CreateDate, b.results[0].CreateDate, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.ticketNotes);
    this.spinnerService.hide();
  }

    compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  navigateToCreateTicket() {
    this.router.navigate(['/ticket/createnewticket', {}]);

  }


}
