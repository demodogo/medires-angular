import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisReservas } from './mis-reservas/mis-reservas';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  declarations: [MisReservas],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MisReservas],
})
export class ReservasModule {}
