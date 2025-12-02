import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@/app/core/services/auth/auth';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
