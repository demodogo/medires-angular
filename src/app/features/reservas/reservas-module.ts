import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisReservas } from './mis-reservas/mis-reservas';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MisReservas],
  imports: [CommonModule, RouterModule],
})
export class ReservasModule {}
