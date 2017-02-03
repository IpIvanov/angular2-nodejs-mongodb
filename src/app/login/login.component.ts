import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {UserService} from '../shared/user/user.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {LocalStorageService} from 'ng2-webstorage';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
    loginForm : FormGroup;

    constructor(public fb : FormBuilder, public userService : UserService, public toastr : ToastsManager, private localStorage : LocalStorageService) {}

    ngOnInit() : void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    submitForm(loginForm, event) : void {
        if((event.keyCode === 13 || event.type === "click") && this.loginForm.valid) {
            this
                .userService
                .login(loginForm)
                .subscribe(res => {
                    console.log(res);
                    if (res.message === 'Wrong password') {
                        this
                            .toastr
                            .warning('Wrong username or password.', 'Warning');
                    } else if (res.message === 'User does not exists.') {
                        this
                            .toastr
                            .warning('Username does not exists, please sign up first.', 'Warning');
                    } else {
                        this
                            .localStorage
                            .store('app-jwt', res.jwt);
                        this
                            .toastr
                            .success('Successful login.', 'Success');
                        this
                            .loginForm
                            .reset();
                    }
                });
        }
    }
}
