import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  declarations: [Dashboard],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class DashboardModule {}
