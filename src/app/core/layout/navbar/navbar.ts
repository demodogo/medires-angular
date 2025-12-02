import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role, User } from '@/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { Auth } from '@/app/core/services/auth/auth';
import { Router } from '@angular/router';

type NavLink = {
  label: string;
  route: string;
};

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private sub?: Subscription;

  links: NavLink[] = [];

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.links = this.buildLinks(user?.role ?? null);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private buildLinks(role: Role | null): NavLink[] {
    if (!role) return [];

    switch (role) {
      case 'admin':
        return [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Agenda', route: '/admin/agenda' },
          { label: 'Pacientes', route: '/admin/pacientes' },
          { label: 'Perfil', route: '/perfil' },
        ];
      case 'patient':
        return [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Nueva reserva', route: '/reservar' },
          { label: 'Mis reservas', route: '/mis-reservas' },
          { label: 'Perfil', route: '/perfil' },
        ];
    }
  }

  async onLogout(): Promise<void> {
    this.auth.logout();
    await this.router.navigate(['/login']);
  }

  get roleLabel(): string {
    if (!this.currentUser) return '';
    return this.currentUser.role === 'patient' ? 'Paciente' : 'Médico';
  }
}
