import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { countries } from '../shared/countries/countries.data';
import { CountryService } from '../shared/countries/country.service';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({ selector: 'app-signup', templateUrl: './signup.component.html', styleUrls: ['./signup.component.scss'] })
export class SignupComponent implements OnInit {
    // Regex for email validator
    emailRegex: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    countries: Array<Object>;
    signUpForm: FormGroup;
    userLocationData: any;
    user: User;

    constructor(public fb: FormBuilder, public countryService: CountryService, public userService: UserService, public toastr: ToastsManager) { }

    ngOnInit(): void {
        this.countries = countries;
        this.signUpForm = new FormGroup({
            username: new FormControl('', [
                Validators.required, Validators.minLength(3)
            ]),
            password: new FormControl('', [
                Validators.required, Validators.minLength(3)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required, Validators.minLength(3)
            ]),
            email: new FormControl('', [
                Validators.required, Validators.pattern(this.emailRegex)
            ]),
            info: new FormGroup({ sex: new FormControl('male') })
        }, this.passwordMatchValidator);

        this
            .countryService
            .getUserLocation()
            .subscribe((data) => {
                this.userLocationData = data;
            });
    }

    submitForm(signUpForm): void {
        this.user = new User(signUpForm.username, signUpForm.password, signUpForm.email, this.userLocationData.country, signUpForm.info.sex);

        this
            .userService
            .addUser(this.user)
            .subscribe(res => {
                if (res.error) {
                    this.toastr.warning('Username already exists please choose different one.', 'Warning');
                    return;
                }
                if (res.message === 'User saved successfully.') {
                    this.toastr.success('Registration was successful.', 'Success');
                    this.user = undefined;
                    this.signUpForm.reset();
                }
            });
    }

    passwordMatchValidator(g: FormGroup) {
        return g
            .get('password')
            .value === g
                .get('confirmPassword')
                .value
            ? null
            : {
                'mismatch': true
            };
    }
}
