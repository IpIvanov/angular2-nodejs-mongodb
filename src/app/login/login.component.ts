import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(public fb: FormBuilder, public userService: UserService, public toastr: ToastsManager) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    submitForm(signUpForm): void {
        this
            .userService
            .getUser(signUpForm)
            .subscribe(res => {
                if (res.error) {
                    this.toastr.error(res.error, res.message);
                }
                if (res.length > 0) {
                    this.toastr.success('Successful login.', 'Success');
                    this.loginForm.reset();
                } else {
                    this.toastr.warning('Wrong username or password.', 'Warning');
                }
            });
    }
}
