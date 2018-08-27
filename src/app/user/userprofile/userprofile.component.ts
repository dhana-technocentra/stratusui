import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../core';

const LOGIN_PATH = '/user/login';
const UPDATE_USERPROFILE = 'User profile udpated successfully';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
    userProfileForm: FormGroup;
    loading = false;
    submitted = false;
    isActive: string = 'Y';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
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
            officePhone:  this.formBuilder.array([
                this.formBuilder.group({
                    phoneNumber: ['', Validators.required],
                    extension: ['']
                })
            ]),
            cellPhone:  this.formBuilder.array([
                this.formBuilder.group({
                    phoneNumber: ['', Validators.required]
                })
            ]),
           
            fax: this.formBuilder.array([ 
                this.formBuilder.group({phoneNumber:['',]})             
            ]),
          
            isActive: ['Y']
        });

        this.userService.getUserProfile('16950')
            .subscribe(data => {
                this.userProfileForm.setValue(data);
            }); 
    }

    initPhoneExtn(isRequired) {

        if (isRequired)
            return this.formBuilder.group({
                phoneNumber: ['', Validators.required],
                extension: ['']
            });
        else
            return this.formBuilder.group({
                phoneNumber: [''],
                extension: ['']
            });
    }
    initPhone(isRequired) {

        if (isRequired)
            return this.formBuilder.group({
                phoneNumber: ['', Validators.required]
            });
        else
            return this.formBuilder.group({
                phoneNumber: ['']
            });
    }

    // convenience getter for easy access to form fields
    get f() { return this.userProfileForm.controls; }

    // On Change event of Toggle Button  
    onChange(event: any) {
        if (event.checked == true) {
            this.isActive = 'Y';
        } else {
            this.isActive = 'N';
        }
    }

    // Executed When Form Is Submitted  
    onFormSubmit(form: NgForm) {
        console.log(form);
        this.submitted = true;
        // stop here if form is invalid
        //if (this.userProfileForm.invalid) {
       //     return;
       // }
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
