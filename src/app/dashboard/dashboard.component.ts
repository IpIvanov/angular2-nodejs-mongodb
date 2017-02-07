import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  imgsrc: string;
  title: string;
  description: string;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit() {
    this.title = 'Title';
    this.description = 'Lorem asdjas djajsd jasdj ajsd jasd j';
  }
}
