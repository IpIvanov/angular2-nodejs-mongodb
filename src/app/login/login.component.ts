import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user/user.service';
import { MdSnackBar } from '@angular/material';


@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isFetching = false;
    correctInfo = false;

    constructor(
        public fb: FormBuilder,
        public userService: UserService,
        public router: Router,
        public snackBar: MdSnackBar
    ) { }

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
                        this.snackBar.open('Wrong username or password.', null, { duration: 2000 });
                    } else if (res.message === 'User does not exists.') {
                        this.snackBar.open('Username does not exists, please sign up first.', null, { duration: 2000 });
                    } else {
                        localStorage.setItem('app-jwt', res.jwt);
                        this.snackBar.open('Successful login.', null, { duration: 2000 });
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
