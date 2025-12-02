import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservar } from './reservar/reservar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Reservar],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ReservarModule {}
