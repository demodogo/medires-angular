import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthModule } from './features/auth/auth-module';
import { Dashboard } from './features/dashboard/dashboard';
import { ProfileModule } from './features/profile/profile-module';
import { ReservasModule } from './features/reservas/reservas-module';
import { ReservarModule } from './features/reservar/reservar-module';

@NgModule({
  declarations: [App, Dashboard],
  imports: [BrowserModule, AppRoutingModule, AuthModule, ProfileModule, ReservasModule, ReservarModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
