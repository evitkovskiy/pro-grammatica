import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators'

// Interfaces
import { LoginResponse } from 'auth/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;
  private role!: string;

  constructor(private router: Router) { }

  login(login: string, password: string): Observable<LoginResponse> {
    if (login === 'yauhen' && password === 'Yauhen96') {
      this.isAuthenticated = true;
      this.role = Math.random() < 0.5 ? 'Admin' : 'Admin';
      return of({
        success: true,
        message: `Autorization by username ${login}`,
        role: this.role
       }).pipe(delay(2000));
    }
    else {
        return timer(2000).pipe(
            switchMap(_ => {
              return throwError({
                success: false,
                message: 'Invalid login or password',
              });
            })
          );
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): Observable<string> {
    return of(this.role);
  }

  isAuthenticatedUser(): boolean {
    this.checkAuthStatusFromStorage();
    return this.isAuthenticated;
  }

  private checkAuthStatusFromStorage(): void {
    if (localStorage.getItem('role')) {
      this.role = localStorage.getItem('role') as string;
      this.isAuthenticated = true;
    }
  }
}
