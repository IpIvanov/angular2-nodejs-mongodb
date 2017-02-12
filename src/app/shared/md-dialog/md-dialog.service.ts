import { Observable } from 'rxjs/Rx';
import { DialogWindowComponent } from './md-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogWindowComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;
        config.width = '420px';

        dialogRef = this.dialog.open(DialogWindowComponent, config);
        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}