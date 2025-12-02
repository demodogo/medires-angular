import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@/app/core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  loginError = '';
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.loginForm.value;
    const ok = this.auth.login(email, password);

    this.isSubmitting = false;

    if (!ok) {
      this.loginError = 'Credenciales inválidas';
      return;
    }

    this.router.navigate(['/dashboard']).then((r) => console.log(r));
  }
}
