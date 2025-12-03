import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: false,
  templateUrl: './recuperar-contrasena.html',
  styleUrl: './recuperar-contrasena.css',
})
export class RecuperarContrasena implements OnInit {
  recoverForm!: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.recoverForm.get('email');
  }

  onSubmit(): void {
    this.successMessage = '';
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }

    const emailValue = this.recoverForm.value.email;

    this.successMessage = `Si existe una cuenta asociada a ${emailValue}, te enviaremos un enlace para restablecer tu contraseña.`;
    this.recoverForm.reset();
  }
}
