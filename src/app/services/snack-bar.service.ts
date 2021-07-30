import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';
interface TypeNotification {
  message: string;
  type: 'success' | 'error' | 'warning'
}

@Injectable({
  providedIn: 'root'
})

export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) {}

  public showNotification({ message, type }: TypeNotification) {
    return this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        type,
      },
      duration: 4500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }
}
