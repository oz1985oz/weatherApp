import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';
import { ErrorMsg } from '../models/error-msg';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  constructor(public dialog: MatDialog) { }
  openDialog(dataDlg: ErrorMsg): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: dataDlg,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
