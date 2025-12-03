import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { RecuperarContrasena } from './recuperar-contrasena/recuperar-contrasena';
import { Register } from './register/register';

@NgModule({
  declarations: [Login, RecuperarContrasena, Register],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
})
export class AuthModule {}
