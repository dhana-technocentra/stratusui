import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Quote } from './../core/models/quote';
import { QuoteService } from './../core/services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quoteForm: FormGroup;
  loading = false;
  submitted = false;
  priorities = ['High', 'Normal', 'Low'];
  services = ['Ethernet Services', 'MPLS Services', 'Frame Relay Services', 'ATM Services', 'OCN(Sonet) Services', 'Voice Services', 'Data Services', 'Conference Calling', 'Directory Assistance', 'Referal Agent', 'Sales Agent', 'Other'];
  states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
  constructor(private formBuilder: FormBuilder,
    private router: Router, private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteForm = this.formBuilder.group({
      message: ['', Validators.required],
      priority: ['', Validators.required],
      service: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  get f() { return this.quoteForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.quoteForm.invalid) {
      return;
    }
    this.quoteService.requestAQuote(this.quoteForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
