import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
