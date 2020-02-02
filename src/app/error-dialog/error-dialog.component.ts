import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMsg } from '../models/error-msg';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorMsg) { }

}
