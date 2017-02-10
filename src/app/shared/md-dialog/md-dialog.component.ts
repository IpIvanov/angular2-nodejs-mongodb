import { Component, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-md-dialog',
    templateUrl: './md-dialog.component.html',
    styleUrls: ['./md-dialog.component.scss']
})
export class DialogWindowComponent {
    public title: string;
    public message: string;


    constructor(public dialogRef: MdDialogRef<DialogWindowComponent>) {

    }
}