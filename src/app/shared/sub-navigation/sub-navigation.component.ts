import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-ui-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.css']
})
export class SubNavigationComponent implements OnInit {
  @Input()
  username: string;

  avatarLink = '../../assets/avatars/avatars-material-man-2.png';

  constructor(private userService: UserService) { }

  ngOnInit() { }
}
