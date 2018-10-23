import { Component, OnInit, HostListener, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AlertService, AuthenticationService, UserService, LoggerService } from '../../core';
import { AppComponent } from './../../app.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng6-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    loginsuccessful = false;
    returnUrl: string;
    width = '';
    formTitle = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService, private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    showError(errorMessage) {
        this.toastr.error(errorMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true}); 
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.appComponent.showNavBar = true;

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (window.innerWidth <= 767) {
            this.appComponent.title = "Companion Portal";
            this.formTitle = "Login";
        } else {
            this.appComponent.title = "Login";
            this.formTitle = "Stratus Customer Login";
        }
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if(event.target.innerWidth <= 767) {
            this.appComponent.title = "Companion Portal";
            this.formTitle = "Login";
        } else {
            this.appComponent.title = "Login";
            this.formTitle = "Stratus Customer Login";
        }
    }

    @HostListener('window:load', ['$event'])
    onLoad(event) {
    console.log(event);
  }

    onSubmit() {
        this.spinnerService.show();
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.spinnerService.hide();
            return;
        }

        this.loading = true;
        var userObject = {
            username: this.f.username.value,
            client_id: environment.oAuthUserName,
            password: this.f.password.value,
            grant_type: "password"
        }
        this.authenticationService.login(userObject)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('user_name', userObject.username);
                    console.log('user_name set', userObject.username);
                    this.spinnerService.hide();
                    this.loginsuccessful = true;
                  
                    setTimeout(()=>{ 
                      this.appComponent.showNavBar = false;
                      this.router.navigate(['inventory']);
                    }, 1500);
                },
                error => {
                    var error = JSON.parse(error._body);
                    this.spinnerService.hide();
                    this.showError(error.error_description);
                    this.alertService.error(error);
                    this.loginsuccessful = false;
                    this.loading = false;
                });
    }
}
