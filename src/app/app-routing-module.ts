import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from '@/app/features/auth/login/login';
import { Dashboard } from '@/app/features/dashboard/dashboard';
import { authGuard } from '@/app/core/guards/auth-guard';
import { loginGuard } from '@/app/core/guards/login-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
