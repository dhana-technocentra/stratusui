import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Quote } from './../core/models/quote';
import { QuoteService } from './../core/services/quote.service';
import { AppComponent } from './../../app/app.component';
import { UserService } from './../core/services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng6-toastr';

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
  sameAsAccount = true;
  userProfile: any;
  states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private formBuilder: FormBuilder,
    private router: Router, private quoteService: QuoteService, private appComponent: AppComponent, private userService: UserService, private spinnerService: Ng4LoadingSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.quoteForm = this.formBuilder.group({
      emailBody: ['', Validators.required],
      priority: ['', Validators.required],
      serviceType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
    if (window.innerWidth <= 767) {
      this.appComponent.title = "Submit Quote";
    } else {
      this.appComponent.title = "Request A Quote";
    }
    this.quoteService.getServices().pipe(first()).subscribe(data => { this.services = data; }, error => { });
    this.userService.getUserProfile().pipe(first()).subscribe(data => { this.userProfile = data; }, error => { });
    this.spinnerService.hide();

  }

  showError(errorMessage) {
    this.toastr.error(errorMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  showSuccess(successMessage) {
    this.toastr.success(successMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 767) {
      this.appComponent.title = "Submit Quote";
    } else {
      this.appComponent.title = "Request A Quote";
    }
  }

  get f() { return this.quoteForm.controls; }
  onSubmit(form: NgForm) {
    this.spinnerService.show();
    this.submitted = true;

    if (this.quoteForm.invalid) {
      this.spinnerService.hide();
      return;
    }
    this.quoteService.requestAQuote(this.quoteForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.showSuccess("Submitted Successfully");
          let control: AbstractControl = null;
          this.quoteForm.reset();
          this.quoteForm.markAsUntouched();
          Object.keys(this.quoteForm.controls).forEach((name) => {
            control = this.quoteForm.controls[name];
            control.setErrors(null);
          });
        },
        error => {
          var error = JSON.parse(error._body);
          this.spinnerService.hide();
          this.showError(error.error_description);
          console.log(error);
        });
  }

  copyUser(event) {
    console.log(event.target.checked);
    var userObject = {};
    if (event.target.checked) {
      userObject = {
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName,
        address: this.userProfile.address,
        city: this.userProfile.city,
        state: this.userProfile.state,
        zip: this.userProfile.zipCode,
        phone: this.quoteForm.controls.phone.value,
        companyName: this.quoteForm.controls.companyName.value,
        serviceType: this.quoteForm.controls.serviceType.value,
        priority: this.quoteForm.controls.priority.value,
        emailBody: this.quoteForm.controls.emailBody.value,
      }
      this.quoteForm.setValue(userObject);
    } else {
      userObject = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: this.quoteForm.controls.phone.value,
        companyName: this.quoteForm.controls.companyName.value,
        serviceType: this.quoteForm.controls.serviceType.value,
        priority: this.quoteForm.controls.priority.value,
        emailBody: this.quoteForm.controls.emailBody.value,
      }
      this.quoteForm.setValue(userObject);
    }
  }

}
