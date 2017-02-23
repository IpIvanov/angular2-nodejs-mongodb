import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { MdSnackBarService } from '../snackbar/snakbar.service';
import { MdDialogRef } from '@angular/material';
import { DialogWindowComponent } from '../md-dialog/md-dialog.component';


@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent {

    loginForm: FormGroup;
    isFetching = false;
    correctInfo = false;
    @Input() dialogRef: MdDialogRef<DialogWindowComponent>;

    constructor(public fb: FormBuilder,
        public userService: UserService,
        public router: Router,
        public snackBar: MdSnackBarService) {

    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    submitForm(loginForm, event): void {
        if ((event.keyCode === 13 || event.type === 'click') && this.loginForm.valid) {
            this.isFetching = true;
            this.userService.login({ localUser: loginForm })
                .subscribe(res => {
                    this.isFetching = false;
                    if (res.message === 'Wrong password') {
                        this.snackBar.open('Wrong username or password.');
                    } else if (res.message === 'User does not exists.') {
                        this.snackBar.open('Username does not exists, please sign up first.');
                    } else {
                        localStorage.setItem('app-jwt', res.jwt);
                        this.snackBar.open('Successful login.');
                        this.dialogRef.close([res.email, res.avatarImg]);
                    }
            });
        }
    }
}
