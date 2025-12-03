import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from '@/app/features/auth/login/login';
import { Dashboard } from '@/app/features/dashboard/dashboard';
import { authGuard } from '@/app/core/guards/auth-guard';
import { loginGuard } from '@/app/core/guards/login-guard';
import { Profile } from '@/app/features/profile/profile';
import { MisReservas } from '@/app/features/reservas/mis-reservas/mis-reservas';
import { roleGuard } from '@/app/core/guards/role-guard';
import { Reservar } from '@/app/features/reservar/reservar/reservar';
import { Pacientes } from '@/app/features/pacientes/pacientes/pacientes';
import { Agenda } from '@/app/features/agenda/agenda/agenda';
import { RecuperarContrasena } from '@/app/features/auth/recuperar-contrasena/recuperar-contrasena';
import { Register } from '@/app/features/auth/register/register';

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
    path: 'perfil',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'registro',
    component: Register,
    canActivate: [loginGuard],
  },
  {
    path: 'admin/pacientes',
    component: Pacientes,
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'mis-reservas',
    component: MisReservas,
    canActivate: [authGuard, roleGuard('patient')],
  },
  {
    path: 'reservar',
    component: Reservar,
    canActivate: [authGuard, roleGuard('patient')],
  },
  {
    path: 'admin/agenda',
    component: Agenda,
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasena,
    canActivate: [loginGuard],
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
