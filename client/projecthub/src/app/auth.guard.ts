// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SignupService } from './services/signup.service';

@Injectable()
export class AuthGuard {
  constructor(private signupService: SignupService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.signupService.isUserAuthenticated()) {
      const userRole = this.signupService.getUserRole();
      if (userRole === 'Admin') {
        // Allow access for authenticated admin users
        // this.router.navigate = ['home'];
        return true;
      } else if (userRole === 'User') {
        // Allow access for authenticated user users
        return false;
      }
    }

    // Deny access for others
    return false;
  }
}
