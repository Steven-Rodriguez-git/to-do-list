import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  success(msg: string) {
    this.snack.open(msg, 'OK', {
      duration: 1500,
      panelClass: ['snack-success'],
    });
  }
  info(msg: string) {
    this.snack.open(msg, 'OK', { duration: 2000, panelClass: ['snack-info'] });
  }
  error(msg: string) {
    this.snack.open(msg, 'OK', { duration: 2500, panelClass: ['snack-error'] });
  }
}
