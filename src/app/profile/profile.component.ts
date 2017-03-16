import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    let params: any = this.activatedRoute.snapshot.params;
    console.log(params.id);
    this.userService.getUserInfoByFacebookId(params.id).subscribe(res => {
      //TODO set user info into the app
    });
  }
}
