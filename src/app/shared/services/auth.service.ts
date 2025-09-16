import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  login(response: { token: string, user: any }) {
    localStorage.setItem(environment.authTokenKey, response.token);
    localStorage.setItem(environment.currentUserKey, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  logout() {
    localStorage.removeItem(environment.authTokenKey);
    localStorage.removeItem(environment.currentUserKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return localStorage.getItem(environment.authTokenKey);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(environment.authTokenKey);
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem(environment.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  public getCurrentUserId(): number | null {
    const user = this.currentUserValue;
    return user ? user.id : null;
  }
}