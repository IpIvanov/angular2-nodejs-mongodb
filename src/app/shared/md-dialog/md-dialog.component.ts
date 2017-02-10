import { Component, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-md-dialog',
    templateUrl: './md-dialog.component.html',
})
export class DialogWindowComponent {
    @Output() onFaceBookLogin = new EventEmitter<Array<any>>();


    constructor(public dialogRef: MdDialogRef<any>) {

    }
}