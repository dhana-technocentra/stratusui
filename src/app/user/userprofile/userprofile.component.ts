import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../core';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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
      dateInput: 'YYYY-MM-DD',
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
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],
})
export class UserProfileComponent implements OnInit {
    userProfileForm: FormGroup;
    loading = false;
    submitted = false;
    isActiveToggle: boolean = false;
    registerMomentDate: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
       // let userId = localStorage.getItem("editUserId");
      
        this.userProfileForm = this.formBuilder.group({
            userSerId:[''],
            personSerId:[''],
            locationSerId:[''],
            companyId:[''],
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            registerDate: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            title: [''],
            officePhone:  
                this.formBuilder.group({
                    phoneNumber: ['', Validators.required],
                    extension: ['']
                }),
            cellPhone: 
                this.formBuilder.group({
                    phoneNumber: ['', Validators.required]
                }),           
            fax: 
                this.formBuilder.group({phoneNumber:['',]}),          
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
        });

    const queryParms = this.route.snapshot.queryParams;
    const userId = (queryParms.userId) ? queryParms.userId : null;

    if (queryParms.userId) {
        this.userService.getUserProfile(userId)
            .subscribe(data => {
                this.userProfileForm.setValue(data);

                if(data['isActive'] == 'Y')
                {
                    this.isActiveToggle = true;
                }
                //this.registerMomentDate = moment();

            }); 
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

    setActive(value)
    {
        this.userProfileForm.patchValue({'isActive' : value});
    }

    // Executed When Form Is Submitted  
    onFormSubmit(form: NgForm) {
        console.log(form);
        this.submitted = true;
        // stop here if form is invalid
        //if (this.userProfileForm.invalid) {
       //     return;
       // }
       /*let  registerDateSelected = JSON.stringify(this.userProfileForm.get('registerDate').value);
       console.log('registerDateSelected', JSON.stringify(registerDateSelected));
       this.userProfileForm.patchValue({'registerDate' :registerDateSelected.slice(0,11)}); */
       this.loading = true;
        this.userService.updateUserProfile(this.userProfileForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('updateUserProfile result ',data);
                   // this.alertService.success(UPDATE_USERPROFILE, true);
                  //  this.router.navigate([LOGIN_PATH]);
                },
                error => {
                    console.log('updateUserProfile result failure ', error);
                   // this.alertService.error(error);
                   // this.loading = false;
                });
    }

    
}
