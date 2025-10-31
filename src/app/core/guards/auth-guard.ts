import { Injectable, inject } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    GuardResult,
    MaybeAsync,
    RedirectCommand,
    Router,
} from '@angular/router';
import { map, catchError } from 'rxjs';
import { AuthService } from '@services/authentication/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated()) {
      // Check if user data is available
      const userData = this.authService.getData();
      if (userData) {
        return true;
      } else {
        // If authenticated but no user data yet, wait for it
        return new Promise<GuardResult>((resolve) => {
          const checkUserData = () => {
            const currentUserData = this.authService.getData();
            if (currentUserData) {
              resolve(true);
            } else {
              setTimeout(checkUserData, 100);
            }
          };
          setTimeout(checkUserData, 100);
        });
      }
    }

    // If not authenticated, try to refresh the token
    return this.authService.refresh().pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          return new RedirectCommand(this.router.parseUrl('/login'));
        }
      }),
      catchError(() => {
        // If refresh fails, redirect to login
        return [new RedirectCommand(this.router.parseUrl('/login'))];
      })
    );
  }

  canActivateChild(): MaybeAsync<GuardResult> {
    return this.canActivate();
  }
}
