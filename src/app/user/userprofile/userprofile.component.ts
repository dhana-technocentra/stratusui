import { Component, OnInit, HostListener, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../../core';
import { AppComponent } from './../../app.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastsManager } from 'ng6-toastr';
import { environment } from '../../../environments/environment';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { SlicePipe } from '@angular/common';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';

const moment = _moment.defaultFormat || _moment;

const LOGIN_PATH = '/user/login';
const UPDATE_USERPROFILE = 'User profile udpated successfully';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput: 'MMMM DD YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class UserProfileComponent implements OnInit {
    userProfileForm: FormGroup;
    passwordFom; FormGroup;
    loading = false;
    submitted = false;
    isActiveToggle: boolean = false;
    registerMomentDate: string;
    userProfile = {};
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private appComponent: AppComponent, private spinnerService: Ng4LoadingSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef, private authenticationService: AuthenticationService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        // let userId = localStorage.getItem("editUserId");
        this.spinnerService.show();
        this.passwordFom = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            password: ['', [Validators.required]]

        })

        this.userProfileForm = this.formBuilder.group({
            userSerId: [''],
            personSerId: [''],
            locationSerId: [''],
            companyId: [''],
            username: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            registerDate: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zipCode: ['', [Validators.required]],
            title: ['', [Validators.required]],
            officePhone:
                this.formBuilder.group({
                    phoneNumber: ['', [Validators.required, Validators.minLength(14)]],
                    extension: ['']
                }),
            cellPhone:
                this.formBuilder.group({
                    phoneNumber: ['', [Validators.required, Validators.minLength(14)]],
                    extension: ['']
                }),
            fax:
                this.formBuilder.group({
                    phoneNumber: ['', [Validators.minLength(14)]],
                    extension: ['']
                }),
            isActive: [''],
            userPermissions:
                this.formBuilder.group({
                    invoiceManagement: [''],
                    firewallRead: [''],
                    firewallWrite: [''],
                    voiceRead: [''],
                    voiceWrite: [''],
                    networkStatistics: ['']
                }),
            admin: [''],
            password: this.formBuilder.group({
                oldPassword: [''],
                password: [''],
                repeatPassword: ['']
            })
        });

        this.userService.getUserProfile()
            .subscribe(data => {
                console.log(data);
                data["password"] = {
                    "oldPassword": "",
                    "password": "",
                    "repeatPassword": ""
                }
                if(typeof data["cellPhone"]["phoneNumber"] == "undefined") {
                    data["cellPhone"]["phoneNumber"] = "";
                    data["cellPhone"]["extension"] = "";
                }
                if(typeof data["officePhone"]["phoneNumber"] == "undefined") {
                    data["officePhone"]["phoneNumber"] = "";
                    data["officePhone"]["extension"] = "";
                }
                if(typeof data["fax"]["phoneNumber"] == "undefined") {
                    data["fax"]["phoneNumber"] = "";
                    data["fax"]["extension"] = "";
                }
                this.userProfileForm.setValue(data);
                var registerDate = new Date(data["registerDate"]).toLocaleString().replace(/[^ -~]/g,'').slice(0, 10);
                registerDate = registerDate.replace(/,/g, "");
                console.log(registerDate);
                this.userProfile = data;
                this.userProfile["registerDate"] = registerDate;
                this.spinnerService.hide();
                if (data['isActive'] == 'Y') {
                    this.isActiveToggle = true;
                }
            });
        this.appComponent.title = "Profile";

    }

    showSuccess(successMessage) {
        this.toastr.success(successMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
    }

    showError(errorMessage) {
        this.toastr.error(errorMessage, '', { dismiss: 'click', showCloseButton: true, enableHTML: true });
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.srcElement.id == "zip" && (event.keyCode < 48 || event.keyCode > 57)) {
            event.returnValue = false;
        }
    }


    // convenience getter for easy access to form fields
    get f() { return this.userProfileForm.controls; }

    // On Change event of Toggle Button  
    onChange(event: any) {
        console.log("Active event", event);
        if (event.checked == true) {
            console.log("Active set to true");
            this.setActive('Y');
        } else {
            console.log("Active set to false");
            this.setActive('N');
        }
    }

    setActive(value) {
        this.userProfileForm.patchValue({ 'isActive': value });
    }

    onFormSubmit(form: NgForm) {
        console.log(form);
        this.submitted = true;
        this.spinnerService.show();
        if (this.userProfileForm.invalid) {
            this.spinnerService.hide();
            return;
        } else if (this.userProfileForm.value.password.oldPassword != "" && (this.userProfileForm.value.password.password == "" || this.userProfileForm.value.password.repeatPassword == "")) {
            this.spinnerService.hide();
            return;
        } else if (this.userProfileForm.value.password.password != "" && (this.userProfileForm.value.password.oldPassword == "" || this.userProfileForm.value.password.repeatPassword == "")) {
            this.spinnerService.hide();
            return;
        } else if (this.userProfileForm.value.password.repeatPassword != "" && (this.userProfileForm.value.password.password == "" || this.userProfileForm.value.password.oldPassword == "")) {
            this.spinnerService.hide();
            return;
        } else {
            this.loading = true;
            console.log(this.userProfileForm.value.oldPassword, this.userProfileForm.value.password);
            if (this.userProfileForm.value.password.oldPassword != "" && this.userProfileForm.value.password.password != "") {
                var passwordObject = {
                    "username": this.userProfileForm.value.username,
                    "oldPassword": this.userProfileForm.value.password.oldPassword,
                    "password": this.userProfileForm.value.password.password
                }
                var userProfileObj = Object.assign({}, this.userProfileForm.value);
                delete userProfileObj["password"];
                this.updateUserProfile(userProfileObj, passwordObject, true);
            } else {
                this.updateUserProfile(this.userProfileForm.value, null, false);
            }
        }
    }

    updateUserProfile(userProfile, passwordObject, updatePassword) {
        this.userService.updateUserProfile(userProfile)
            .subscribe(
                data => {
                    this.showSuccess("Updated Successfully");
                    if (updatePassword) {
                        this.updatePassword(userProfile, passwordObject);
                    } else {
                        this.spinnerService.hide();
                    }
                },
                error => {
                    console.log(error);
                    this.spinnerService.hide();
                    this.showError(error);
                });
    }

    updatePassword(userProfile, passwordObject) {
        this.userService.updatePassword(passwordObject)
            .subscribe(
                data => {
                    if (data["status"] == "failed - no matching found.") {
                        this.spinnerService.hide();
                        this.showError("Invalid Current Password!");
                    } else {
                        this.reLoginForNewAccessToken(userProfile, passwordObject);
                    }
                },
                error => {
                    var error = JSON.parse(error._body);
                    this.spinnerService.hide();
                    this.showError(error.error_description);
                });
    }

    reLoginForNewAccessToken(userProfile, passwordObject) {
        var userObject = {
            username: userProfile.username,
            client_id: environment.oAuthUserName,
            password: passwordObject.password,
            grant_type: "password"
        }
        this.spinnerService.hide();
        this.authenticationService.login(userObject)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('user_name', userObject.username);
                    console.log('user_name set', userObject.username);
                    this.userProfileForm.controls.password.reset();
                    let control: AbstractControl = null;
                    Object.keys(this.userProfileForm.controls.password).forEach((name) => {
                        control = this.userProfileForm.controls[name];
                        control.setErrors(null);
                    }); 
                },
                error => {
                    var error = JSON.parse(error._body);
                    this.spinnerService.hide();
                    this.showError(error.error_description);
                });
    }

    
}
