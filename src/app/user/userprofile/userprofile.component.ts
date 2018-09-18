import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../core';
import { AppComponent } from './../../app.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private appComponent: AppComponent) { }

    ngOnInit() {
        // let userId = localStorage.getItem("editUserId");

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
            title: [''],
            officePhone:
                this.formBuilder.group({
                    phoneNumber: ['', Validators.required],
                    extension: ['']
                }),
            cellPhone:
                this.formBuilder.group({
                    phoneNumber: ['', [Validators.required]],
                    extension: ['']
                }),
            fax:
                this.formBuilder.group({
                    phoneNumber: ['', [Validators.required]],
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
                this.userProfileForm.setValue(data);
                this.userProfile = data;
                if (data['isActive'] == 'Y') {
                    this.isActiveToggle = true;
                }
            });
        this.appComponent.title = "Profile";

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
        this.submitted = true;
        if (this.userProfileForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.userProfileForm.value.oldPassword, this.userProfileForm.value.password);
        if (this.userProfileForm.value.password.oldPassword != "" && this.userProfileForm.value.password.password != "") {
            var passwordObject = {
                "username": this.userProfileForm.value.username,
                "oldPassword": this.userProfileForm.value.password.oldPassword,
                "password": this.userProfileForm.value.password.password
            }
            this.userService.updatePassword(passwordObject)
                .pipe(first())
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => {
                        console.log(error);
                    });
        }
        var userProfileObj = Object.assign({}, this.userProfileForm.value);
        delete userProfileObj["password"];
        this.userService.updateUserProfile(userProfileObj)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(UPDATE_USERPROFILE, true);
                    console.log('updateUserProfile result ', data);
                    //  this.router.navigate([LOGIN_PATH]);
                },
                error => {
                    console.log('updateUserProfile result failure ', error);
                    // this.alertService.error(error);
                    // this.loading = false;
                });
    }


}
