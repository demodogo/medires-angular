import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCard } from './dashboard-card/dashboard-card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardCard],
  imports: [CommonModule, RouterModule],
  exports: [DashboardCard],
})
export class SharedModule {}
