import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@/app/core/services/auth/auth';
import { Role } from '@/app/core/models/user.model';

export function roleGuard(requiredRole: Role): CanActivateFn {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);

    if (auth.hasRole(requiredRole)) {
      return true;
    }

    router.navigate(['/dashboard']);
    return false;
  };
}
