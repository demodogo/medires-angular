import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@/app/core/services/auth/auth';
import { Router } from '@angular/router';
import { User } from '@/app/core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm!: FormGroup;
  currentUser: User | null = null;
  private sub?: Subscription;
  saveMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      passwordRepeat: [''],
    });

    this.sub = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user;

      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        });
      }
    });
  }

  get name(): AbstractControl | null {
    return this.profileForm.get('name');
  }
  get lastName(): AbstractControl | null {
    return this.profileForm.get('lastName');
  }
  get email(): AbstractControl | null {
    return this.profileForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.profileForm.get('password');
  }
  get passwordRepeat(): AbstractControl | null {
    return this.profileForm.get('passwordRepeat');
  }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.currentUser) return;

    if (this.profileForm.value.password !== this.profileForm.value.passwordRepeat) {
      this.saveMessage = 'Las contraseñas no coinciden';
      return;
    }

    const updatedUser = {
      ...this.currentUser,
      name: this.profileForm.value.name,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
    };

    this.auth.updateCurrentUser(updatedUser);
    this.saveMessage = 'Perfil actualizado correctamente';
  }
}
