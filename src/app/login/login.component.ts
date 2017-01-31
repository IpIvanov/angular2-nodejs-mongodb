import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    form: FormGroup;

    constructor(public fb: FormBuilder) {

        this.form = fb.group({
            text: ['', Validators.required],
            name: ['', Validators.required]
        });

    }

    submitForm(): void {
        //TODO
    }
}
