import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AlertService, AuthenticationService, UserService, LoggerService } from '../../core';
import { AppComponent } from './../../app.component';

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

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService, private appComponent: AppComponent) { }

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
        console.log(window.innerWidth);
        if (window.screen.width <= 767) {
            this.appComponent.title = "Companion Portal";
        } else {
            this.appComponent.title = "Login";
        }   
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if(event.target.innerWidth <= 767) {
            this.appComponent.title = "Companion Portal";
        } else {
            this.appComponent.title = "Login";
        }
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
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
                    this.loginsuccessful = true;
                  
                    setTimeout(()=>{ 
                      this.appComponent.showNavBar = false;
                      this.router.navigate(['user/userprofile']);
                    }, 1500);
                },
                error => {
                    this.alertService.error(error);
                    this.loginsuccessful = false;
                    this.loading = false;
                });
    }
}
