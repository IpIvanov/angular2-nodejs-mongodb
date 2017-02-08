import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MdSnackBarService {
    duration = 2000;

    constructor(public mdSnackBar: MdSnackBar) { }

    open(message: string): void {
        this.mdSnackBar.open(message, null, { duration: this.duration });
    }
}