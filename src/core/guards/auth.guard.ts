import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { AuthService } from 'core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
