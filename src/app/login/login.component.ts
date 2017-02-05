import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isFetching = false;
    correctInfo = false;

    constructor(
        public fb: FormBuilder,
        public userService: UserService,
        public toastr: ToastsManager,
        public router: Router
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
                        this.toastr.warning('Wrong username or password.', 'Warning');
                    } else if (res.message === 'User does not exists.') {
                        this.toastr.warning('Username does not exists, please sign up first.', 'Warning');
                    } else {
                        localStorage.setItem('app-jwt', res.jwt);
                        localStorage.setItem('app-username', loginForm.username);
                        this.toastr.success('Successful login.', 'Success');
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
