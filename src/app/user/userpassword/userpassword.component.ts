import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidator } from './../../core/validators';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../core';

const UPDATE_USERPASSWORD = 'Password udpated successfully';

@Component({
  selector: 'app-userpassword',
  templateUrl: './userpassword.component.html',
  styleUrls: ['./userpassword.component.css']
})
export class UserPasswordComponent implements OnInit {
  userPasswordForm: FormGroup;
  loading: boolean;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {

  let username = localStorage.getItem("user_name");
  console.log('username',username);
  this.userPasswordForm = this.formBuilder.group({
    username:[username],
    password: ['',[Validators.minLength(5),
      Validators.required
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
   ]],
   confirm_password: ['',Validators.required]
  },
  {
    validator: PasswordValidator.MatchPassword 
  });

}

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;

    
    // stop here if form is invalid
    if (this.userPasswordForm.invalid) {
        return;
    }

    this.loading = true;
        this.userService.updatePassword(this.userPasswordForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('updateUserPassword result ',data);
                    this.alertService.success(UPDATE_USERPASSWORD, true);                  
                },
                error => {
                    console.log('updateUserPassword result failure ', error);
                    this.alertService.error(error);
                    this.loading = false;
                });
  }
}
