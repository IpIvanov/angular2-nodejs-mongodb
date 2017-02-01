import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { countries } from '../shared/countries/countries.data';
import { CountryService } from '../shared/countries/country.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    countries: Array<Object>;
    user: FormGroup = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
        location: new FormControl(),
        info: new FormGroup({
            age: new FormControl(),
            sex: new FormControl()
        })
    });
    userLocationData: any;

    constructor(public fb: FormBuilder, public countryService: CountryService) {
    }

    ngOnInit(): void {
        this.countries = countries;
        this.countryService.getUserLocation().subscribe(
            (data) => {
                this.userLocationData = data;
                this.user = new FormGroup({
                    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
                    password: new FormControl('', Validators.required),
                    confirmPassword: new FormControl('', Validators.required),
                    location: new FormControl(this.userLocationData.country),
                    info: new FormGroup({
                        age: new FormControl(''),
                        sex: new FormControl('male')
                    })
                });
            }
        );
    }

    submitForm(): void {
        console.log(this.user.value, this.user.valid);
    }
}
