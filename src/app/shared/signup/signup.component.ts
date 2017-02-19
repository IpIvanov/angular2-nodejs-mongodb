import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { countries } from '../countries/countries.data';
import { CountryService } from '../countries/country.service';
import { UserService } from '../user/user.service';
import { MdSnackBarService } from '../snackbar/snakbar.service';
import { MdDialogRef } from '@angular/material';
import { DialogWindowComponent } from '../md-dialog/md-dialog.component';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    // Regex for email validator
    emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    countries: Array<Object>;
    signUpForm: FormGroup;
    userLocationData: any;
    saltRounds = 10;
    isFetching = false;
    correctInfo = false;
    @Input() dialogRef: MdDialogRef<DialogWindowComponent>;

    constructor(
        public fb: FormBuilder,
        public countryService: CountryService,
        public userService: UserService,
        private router: Router,
        public snackBar: MdSnackBarService
    ) { }

    ngOnInit(): void {
        this.countries = countries;
        this.signUpForm = new FormGroup({
            email: new FormControl('', [
                Validators.minLength(3), Validators.pattern(this.emailRegex)
            ]),
            password: new FormControl('', [
                Validators.required, Validators.minLength(3)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required, Validators.minLength(3)
            ])
        }, this.passwordMatchValidator);

        this.countryService.getUserLocation()
            .subscribe((data) => {
                this.userLocationData = data;
            });
    }

    submitForm(signUpForm, event): void {
        if ((event.keyCode === 13 || event.type === 'click') && this.signUpForm.valid) {
            this.isFetching = true;

            this.userService.signUp({
                local:
                { email: signUpForm.email, password: signUpForm.password, avatarImg: 'avatars-material-man-2.png' }
            }).subscribe(res => {
                this.isFetching = false;
                if (res.message === 'Username already exists.') {
                    this.snackBar.open('Username already exists please choose different one.');
                } else {
                    localStorage.setItem('app-jwt', res.jwt);
                    this.snackBar.open('Registration was successful.');
                    this.dialogRef.close([res.email, res.avatarImg]);
                }
            });
        }
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
    }
}
