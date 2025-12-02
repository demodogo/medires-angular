import { Pacientes } from '@/app/features/pacientes/pacientes/pacientes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Pacientes],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [Pacientes],
})
export class PacientesModule {}
