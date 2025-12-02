import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from './dashboard-card/dashboard-card';

@NgModule({
  declarations: [DashboardCard],
  imports: [CommonModule],
  exports: [DashboardCard],
})
export class SharedModule {}
