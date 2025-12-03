import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthModule } from './features/auth/auth-module';
import { ProfileModule } from './features/profile/profile-module';
import { ReservasModule } from './features/reservas/reservas-module';
import { ReservarModule } from './features/reservar/reservar-module';
import { Navbar } from './core/layout/navbar/navbar';
import { DashboardModule } from '@/app/features/dashboard/dashboard.module';
import { SharedModule } from '@/app/shared/shared.module';
import { PacientesModule } from '@/app/features/pacientes/pacientes/pacientes.module';
import { Agenda } from './features/agenda/agenda/agenda';

@NgModule({
  declarations: [App, Navbar, Agenda],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule,
    ReservasModule,
    ReservarModule,
    DashboardModule,
    SharedModule,
    PacientesModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
