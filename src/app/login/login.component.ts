import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user/user.service';
import { MdSnackBarService } from '../shared/snackbar/snakbar.service';


@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent {

    loginForm: FormGroup;
    isFetching = false;
    correctInfo = false;

    constructor(public fb: FormBuilder,
        public userService: UserService,
        public router: Router,
        public snackBar: MdSnackBarService) {

    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    submitForm(loginForm, event): void {
        if ((event.keyCode === 13 || event.type === 'click') && this.loginForm.valid) {
            this.isFetching = true;
            this.userService.login(loginForm)
                .subscribe(res => {
                    this.isFetching = false;
                    if (res.message === 'Wrong password') {
                        this.snackBar.open('Wrong username or password.');
                    } else if (res.message === 'User does not exists.') {
                        this.snackBar.open('Username does not exists, please sign up first.');
                    } else {
                        localStorage.setItem('app-jwt', res.jwt);
                        this.snackBar.open('Successful login.');
                        this.correctInfo = true;
                    }
                }).add(() => {
                    if (this.correctInfo) {
                        this.router.navigate(['/dashboard']);
                    }
                });
        }
    }

}
