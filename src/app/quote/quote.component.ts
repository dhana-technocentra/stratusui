import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Quote } from './../core/models/quote';
import { QuoteService } from './../core/services/quote.service';
import { AppComponent } from './../../app/app.component';
import { UserService } from './../core/services/user.service';

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
  services: any;
  sameAsAccount = false;
  userProfile: any;
  states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
  constructor(private formBuilder: FormBuilder,
    private router: Router, private quoteService: QuoteService, private appComponent: AppComponent, private userService: UserService) { }

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
    this.appComponent.title = "Request A Quote";
    this.quoteService.getServices().pipe(first()).subscribe(data => { this.services = data; }, error => { });
    this.userService.getUserProfile().pipe(first()).subscribe(data => { this.userProfile = data; }, error => { });

  }
  

  get f() { return this.quoteForm.controls; }
  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.quoteForm.invalid) {
      return;
    }
    // this.quoteService.requestAQuote(this.quoteForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //     });
    console.log(this.quoteForm.value);
  }

  copyUser() {
    if (this.sameAsAccount) {
      this.quoteForm.value.firstName = this.userProfile.firstName;
      this.quoteForm.value.lastName = this.userProfile.lastName;
      this.quoteForm.value.company = this.userProfile.company;
      this.quoteForm.value.address = this.userProfile.address;
      this.quoteForm.value.city = this.userProfile.city;
      this.quoteForm.value.state = this.userProfile.state;
      this.quoteForm.value.zip = this.userProfile.zipCode;
      console.log(this.quoteForm.value);
    }
    console.log(this.sameAsAccount);
  }

}
