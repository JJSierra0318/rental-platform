import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public message: string | null = null;

  set(message: string) {
    this.message = message;
  }

  clear() {
    this.message = null;
  }
}
